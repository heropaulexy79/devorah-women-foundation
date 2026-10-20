'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileText, BarChart3, Image as ImageIcon, Award, LogOut, Plus, CheckCircle, Sparkles, TrendingUp, Users, ShieldCheck, Search, Trash2, Edit3, MapPin, Calendar, ExternalLink, Upload, FolderPlus } from 'lucide-react';
import { ARTICLES, IMPACT_METRICS, PROGRAMS, GALLERY_ITEMS, LEADERSHIP_PEOPLE } from '@/lib/data';
import { GalleryItem, Person } from '@/lib/types';

const GALLERY_CATEGORIES = [
  'Community Outreach',
  'Faith and Spiritual Development',
  'School Outreaches',
  'Leadership Development',
  'Women Empowerment',
] as const;

export default function AdminDashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'board' | 'gallery' | 'metrics' | 'insights'>('overview');

  // Article state
  const [articlesList, setArticlesList] = useState(ARTICLES);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: "Girls' Development" as const,
    excerpt: '',
    content: '',
    readingTime: '4 min read',
    authorName: 'Executive Director',
    authorRole: "Devorah Women's Leadership & Empowerment Initiative",
    featuredImageUrl: '/images/story_beneficiary.png',
  });

  // Board Members state
  const [boardList, setBoardList] = useState<Person[]>(LEADERSHIP_PEOPLE);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [boardForm, setBoardForm] = useState({
    name: '',
    title: '',
    biography: '',
    background: '',
    education: '',
    vision: '',
    quote: '',
    expertise: '',
    imageUrl: '/images/board/Faith-Akinola.jpeg',
  });
  const [isBoardPhotoUploading, setIsBoardPhotoUploading] = useState(false);
  const boardPhotoInputRef = useRef<HTMLInputElement>(null);

  // Gallery state
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Community Outreach' as (typeof GALLERY_CATEGORIES)[number],
    date: 'October 2026',
    location: 'Lagos, Nigeria',
    caption: '',
    impactHighlight: '',
    imageUrl: '/images/gallery_outreach.png',
    photos: [] as { id: string; url: string; caption?: string }[],
  });

  // Upload state (Articles)
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload state (Gallery Cover & Additional Photos — split so they don't block each other)
  const [isGalleryCoverUploading, setIsGalleryCoverUploading] = useState(false);
  const [isGalleryExtraUploading, setIsGalleryExtraUploading] = useState(false);
  const galleryCoverInputRef = useRef<HTMLInputElement>(null);
  const galleryExtraPhotosInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (data.success) {
        setArticleForm((prev) => ({ ...prev, featuredImageUrl: data.url }));
        showSuccessNotification('Image uploaded successfully!');
      } else {
        showSuccessNotification(data.message || 'Upload failed');
      }
    } catch {
      showSuccessNotification('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const SAMPLE_IMAGES = [
    { label: 'Beneficiary Story', url: '/images/story_beneficiary.png' },
    { label: 'Hero Portrait', url: '/images/hero_portrait.png' },
    { label: 'Founder Portrait', url: '/images/founder_portrait.png' },
    { label: 'Community Outreach', url: '/images/who_we_are.png' },
    { label: 'Conference / Summit', url: '/images/gallery_conference.png' },
    { label: 'STEM & Digital', url: '/images/gallery_stem.png' },
    { label: 'Spiritual Retreat', url: '/images/gallery_retreat.png' },
  ];

  const openNewArticleModal = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: '',
      category: "Girls' Development",
      excerpt: '',
      content: '',
      readingTime: '4 min read',
      authorName: 'Executive Director',
      authorRole: "Devorah Women's Leadership & Empowerment Initiative",
      featuredImageUrl: '/images/story_beneficiary.png',
    });
    setShowArticleModal(true);
  };

  const openEditArticleModal = (article: typeof ARTICLES[0]) => {
    setEditingArticleId(article.id);
    setArticleForm({
      title: article.title,
      category: article.category as any,
      excerpt: article.excerpt,
      content: article.content,
      readingTime: article.readingTime,
      authorName: article.author.name,
      authorRole: article.author.role,
      featuredImageUrl: article.featuredImageUrl,
    });
    setShowArticleModal(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.excerpt) return;

    try {
      if (editingArticleId) {
        // Edit existing article
        const payload = {
          id: editingArticleId,
          title: articleForm.title,
          category: articleForm.category,
          excerpt: articleForm.excerpt,
          content: articleForm.content || articleForm.excerpt,
          readingTime: articleForm.readingTime,
          author: { name: articleForm.authorName, role: articleForm.authorRole, avatarUrl: '/images/founder_portrait.png' },
          featuredImageUrl: articleForm.featuredImageUrl,
        };

        const res = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update_article', payload }),
        });
        const data = await res.json();
        if (data.success) {
          setArticlesList(articlesList.map((a) => (a.id === editingArticleId ? data.article : a)));
          setShowArticleModal(false);
          showSuccessNotification('Article updated successfully!');
        }
      } else {
        // Create new article
        const res = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'add_article',
            payload: {
              title: articleForm.title,
              category: articleForm.category,
              excerpt: articleForm.excerpt,
              content: articleForm.content || articleForm.excerpt,
              readingTime: articleForm.readingTime,
              author: { name: articleForm.authorName, role: articleForm.authorRole, avatarUrl: '/images/founder_portrait.png' },
              featuredImageUrl: articleForm.featuredImageUrl,
              featured: true,
            }
          }),
        });
        const data = await res.json();
        if (data.success) {
          setArticlesList([data.article, ...articlesList]);
          setShowArticleModal(false);
          showSuccessNotification('Article created and published successfully!');
        }
      }
    } catch {
      showSuccessNotification('Failed to save article');
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_article', payload: { id } }),
      });
      const data = await res.json();
      if (data.success) {
        setArticlesList(articlesList.filter((a) => a.id !== id));
        showSuccessNotification('Article deleted successfully.');
      }
    } catch {
      showSuccessNotification('Failed to delete article');
    }
  };

  // Board Members CRUD functions
  const openEditBoardModal = (member: Person) => {
    setEditingBoardId(member.id);
    setBoardForm({
      name: member.name,
      title: member.title || '',
      biography: member.biography,
      background: member.background || '',
      education: member.education || '',
      vision: member.vision || '',
      quote: member.quote || '',
      expertise: (member.expertise || []).join(', '),
      imageUrl: member.imageUrl,
    });
    setShowBoardModal(true);
  };

  const handleBoardPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsBoardPhotoUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (data.success) {
        setBoardForm((prev) => ({ ...prev, imageUrl: data.url }));
        showSuccessNotification('Photo uploaded successfully!');
      } else {
        showSuccessNotification(data.message || 'Upload failed');
      }
    } catch {
      showSuccessNotification('Upload failed. Please try again.');
    } finally {
      setIsBoardPhotoUploading(false);
      if (boardPhotoInputRef.current) boardPhotoInputRef.current.value = '';
    }
  };

  const handleSaveBoardMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBoardId) return;
    try {
      const payload = {
        id: editingBoardId,
        name: boardForm.name,
        title: boardForm.title,
        biography: boardForm.biography,
        background: boardForm.background,
        education: boardForm.education,
        vision: boardForm.vision,
        quote: boardForm.quote,
        expertise: boardForm.expertise.split(',').map((s) => s.trim()).filter(Boolean),
        imageUrl: boardForm.imageUrl,
      };
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_board_member', payload }),
      });
      const data = await res.json();
      if (data.success) {
        setBoardList(boardList.map((m) => (m.id === editingBoardId ? data.member : m)));
        setShowBoardModal(false);
        showSuccessNotification('Board member profile updated successfully!');
      } else {
        showSuccessNotification(data.message || 'Failed to update profile');
      }
    } catch {
      showSuccessNotification('Failed to save board member');
    }
  };

  // Gallery CRUD functions
  const openNewGalleryModal = () => {
    setEditingGalleryId(null);
    setGalleryForm({
      title: '',
      category: 'Community Outreach',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      location: 'Lagos, Nigeria',
      caption: '',
      impactHighlight: '',
      imageUrl: '/images/gallery_outreach.png',
      photos: [],
    });
    setShowGalleryModal(true);
  };

  const openEditGalleryModal = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setGalleryForm({
      title: item.title,
      category: item.category as any,
      date: item.date,
      location: item.location,
      caption: item.caption,
      impactHighlight: item.impactHighlight || '',
      imageUrl: item.imageUrl,
      photos: item.photos ? [...item.photos] : [{ id: `photo-${item.id}`, url: item.imageUrl, caption: item.caption }],
    });
    setShowGalleryModal(true);
  };

  const handleGalleryCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsGalleryCoverUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (data.success) {
        setGalleryForm((prev) => {
          // If photos array is empty, seed it with the cover
          if (prev.photos.length === 0) {
            return {
              ...prev,
              imageUrl: data.url,
              photos: [{ id: `photo-${Date.now()}`, url: data.url, caption: prev.caption }],
            };
          }
          // If the current cover was already in the photos array, replace that entry too
          const updatedPhotos = prev.photos.map((p) =>
            p.url === prev.imageUrl ? { ...p, url: data.url } : p
          );
          return { ...prev, imageUrl: data.url, photos: updatedPhotos };
        });
        showSuccessNotification('Gallery cover photograph uploaded successfully!');
      } else {
        showSuccessNotification(data.message || 'Cover upload failed');
      }
    } catch {
      showSuccessNotification('Cover upload failed. Please try again.');
    } finally {
      setIsGalleryCoverUploading(false);
      if (galleryCoverInputRef.current) galleryCoverInputRef.current.value = '';
    }
  };

  const handleGalleryExtraPhotosUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsGalleryExtraUploading(true);
    let uploadedCount = 0;
    try {
      // Upload all files and collect results before setting state once
      const newPhotos: { id: string; url: string; caption: string }[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: form });
        const data = await res.json();
        if (data.success) {
          uploadedCount++;
          newPhotos.push({
            id: `photo-${Date.now()}-${i}`,
            url: data.url,
            caption: '',
          });
        }
      }
      // Batch state update after all uploads complete
      setGalleryForm((prev) => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
      showSuccessNotification(`${uploadedCount} photograph(s) uploaded to album!`);
    } catch {
      showSuccessNotification('Upload failed for additional photos');
    } finally {
      setIsGalleryExtraUploading(false);
      if (galleryExtraPhotosInputRef.current) galleryExtraPhotosInputRef.current.value = '';
    }
  };

  const handleRemovePhotoFromAlbum = (index: number) => {
    const updated = galleryForm.photos.filter((_, idx) => idx !== index);
    setGalleryForm((prev) => ({
      ...prev,
      photos: updated,
      imageUrl: prev.imageUrl === prev.photos[index]?.url && updated.length > 0 ? updated[0].url : prev.imageUrl,
    }));
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.imageUrl) return;

    try {
      if (editingGalleryId) {
        // Edit existing album
        const payload = {
          id: editingGalleryId,
          title: galleryForm.title,
          category: galleryForm.category,
          date: galleryForm.date,
          location: galleryForm.location,
          caption: galleryForm.caption,
          impactHighlight: galleryForm.impactHighlight,
          imageUrl: galleryForm.imageUrl,
          photos: galleryForm.photos.length > 0
            ? galleryForm.photos
            : [{ id: `photo-${Date.now()}`, url: galleryForm.imageUrl, caption: galleryForm.caption }],
        };

        const res = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update_gallery', payload }),
        });
        const data = await res.json();
        if (data.success) {
          setGalleryList(galleryList.map((g) => (g.id === editingGalleryId ? data.galleryItem : g)));
          setShowGalleryModal(false);
          showSuccessNotification('Gallery album updated successfully!');
        } else {
          showSuccessNotification(data.message || 'Failed to update album');
        }
      } else {
        // Create new album
        const res = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'add_gallery',
            payload: {
              title: galleryForm.title,
              category: galleryForm.category,
              date: galleryForm.date,
              location: galleryForm.location,
              caption: galleryForm.caption,
              impactHighlight: galleryForm.impactHighlight,
              imageUrl: galleryForm.imageUrl,
              photos: galleryForm.photos.length > 0
                ? galleryForm.photos
                : [{ id: `photo-${Date.now()}`, url: galleryForm.imageUrl, caption: galleryForm.caption }],
            },
          }),
        });
        const data = await res.json();
        if (data.success) {
          setGalleryList([data.galleryItem, ...galleryList]);
          setShowGalleryModal(false);
          showSuccessNotification('New gallery album published successfully!');
        } else {
          showSuccessNotification(data.message || 'Failed to create gallery album');
        }
      }
    } catch {
      showSuccessNotification('Failed to save gallery album');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery album?')) return;
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_gallery', payload: { id } }),
      });
      const data = await res.json();
      if (data.success) {
        setGalleryList(galleryList.filter((g) => g.id !== id));
        showSuccessNotification('Gallery album deleted successfully.');
      } else {
        showSuccessNotification(data.message || 'Failed to delete gallery album');
      }
    } catch {
      showSuccessNotification('Failed to delete gallery album');
    }
  };

  // Metrics & notification state
  const [metricsList, setMetricsList] = useState(IMPACT_METRICS);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setIsMounted(true);
    // Check server-side session cookie (HttpOnly — JS cannot read it directly)
    fetch('/api/admin/auth/check', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) setIsAuthenticated(true);
      })
      .catch(() => {});
    fetch('/api/content', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.metrics) setMetricsList(data.metrics);
        if (data.articles) setArticlesList(data.articles);
        if (data.gallery) setGalleryList(data.gallery);
        if (data.boardMembers) setBoardList(data.boardMembers);
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setPasskey('');
      } else {
        setAuthError(data.message || 'Incorrect Admin Passkey');
      }
    } catch {
      setAuthError('Connection failed');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE', credentials: 'include' }).catch(() => {});
    setIsAuthenticated(false);
  };

  const handleUpdateMetric = (index: number, field: 'number' | 'label' | 'description', value: string) => {
    const updated = [...metricsList];
    updated[index] = { ...updated[index], [field]: value };
    setMetricsList(updated);
  };

  const saveMetrics = async () => {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_metrics', payload: metricsList }),
      });
      showSuccessNotification('Impact metrics saved successfully!');
    } catch {
      showSuccessNotification('Failed to save metrics');
    }
  };

  const showSuccessNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Prevent SSR Hydration mismatches with client-side localStorage state
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#6E3A82] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-[#E8DDF0] text-center space-y-6">
          <div className="w-16 h-16 bg-[#F4ECF7] rounded-full flex items-center justify-center mx-auto text-[#6E3A82]">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#3B214F]">Devorah Initiative CMS</h1>
            <p className="text-xs text-[#716A73] mt-1">Admin Content Portal & Digital Insights</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#3B214F] uppercase tracking-wider mb-2">
                Admin Passkey
              </label>
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter passkey (Default: devorah2026)"
                className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6E3A82]"
                required
              />
            </div>

            {authError && (
              <p className="text-xs text-red-600 font-medium bg-red-50 p-2.5 rounded-lg text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#6E3A82] hover:bg-[#8B4FA0] text-white font-medium py-3 rounded-xl transition-all shadow-md text-sm"
            >
              Sign In to CMS Console
            </button>
          </form>

          <p className="text-[11px] text-[#A088B0]">
            Authorized personnel only. Default passkey: <code className="bg-[#F4ECF7] px-1.5 py-0.5 rounded text-[#3B214F]">devorah2026</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#3B214F] text-white p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6E3A82] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C5A8D8]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg leading-tight">Devorah CMS</h2>
              <span className="text-[10px] text-[#C5A8D8] tracking-widest uppercase font-semibold">Admin Panel</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'overview' ? 'bg-[#6E3A82] text-white' : 'text-[#C5A8D8] hover:bg-[#6E3A82]/30'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard Overview
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'articles' ? 'bg-[#6E3A82] text-white' : 'text-[#C5A8D8] hover:bg-[#6E3A82]/30'
              }`}
            >
              <FileText className="w-4 h-4" />
              Stories & Articles ({articlesList.length})
            </button>

            <button
              onClick={() => setActiveTab('board')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'board' ? 'bg-[#6E3A82] text-white' : 'text-[#C5A8D8] hover:bg-[#6E3A82]/30'
              }`}
            >
              <Users className="w-4 h-4" />
              Board Members ({boardList.length})
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'gallery' ? 'bg-[#6E3A82] text-white' : 'text-[#C5A8D8] hover:bg-[#6E3A82]/30'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Gallery Albums ({galleryList.length})
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'metrics' ? 'bg-[#6E3A82] text-white' : 'text-[#C5A8D8] hover:bg-[#6E3A82]/30'
              }`}
            >
              <Award className="w-4 h-4" />
              Impact Metrics ({metricsList.length})
            </button>

            <button
              onClick={() => setActiveTab('insights')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'insights' ? 'bg-[#6E3A82] text-white' : 'text-[#C5A8D8] hover:bg-[#6E3A82]/30'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Digital Insights & AI
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#6E3A82]/40 space-y-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-[#C5A8D8] hover:text-white flex items-center gap-2"
          >
            ← View Live Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs text-red-300 hover:text-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Dashboard Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto space-y-8">
        {notification && (
          <div className="bg-[#6E3A82] text-white p-4 rounded-xl flex items-center gap-3 shadow-lg animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-300 shrink-0" />
            <p className="text-sm font-medium">{notification}</p>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#3B214F]">Welcome to Devorah CMS Dashboard</h1>
              <p className="text-sm text-[#716A73] mt-1">
                Manage website content, track AI assistant conversations, and review digital platform performance.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                onClick={() => setActiveTab('articles')}
                className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-2 cursor-pointer hover:border-[#6E3A82] transition-colors"
              >
                <div className="flex justify-between items-center text-[#6E3A82]">
                  <FileText className="w-6 h-6" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A088B0]">Articles</span>
                </div>
                <p className="text-3xl font-serif font-bold text-[#3B214F]">{articlesList.length}</p>
                <p className="text-xs text-[#716A73]">Published Stories & News</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-2">
                <div className="flex justify-between items-center text-[#6E3A82]">
                  <Award className="w-6 h-6" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A088B0]">Programs</span>
                </div>
                <p className="text-3xl font-serif font-bold text-[#3B214F]">{PROGRAMS.length}</p>
                <p className="text-xs text-[#716A73]">Active Foundation Initiatives</p>
              </div>

              <div
                onClick={() => setActiveTab('gallery')}
                className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-2 cursor-pointer hover:border-[#6E3A82] transition-colors"
              >
                <div className="flex justify-between items-center text-[#6E3A82]">
                  <ImageIcon className="w-6 h-6" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A088B0]">Gallery</span>
                </div>
                <p className="text-3xl font-serif font-bold text-[#3B214F]">{galleryList.length}</p>
                <p className="text-xs text-[#716A73]">Event Albums & Outreaches</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-2">
                <div className="flex justify-between items-center text-[#6E3A82]">
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A088B0]">AI Queries</span>
                </div>
                <p className="text-3xl font-serif font-bold text-[#3B214F]">142</p>
                <p className="text-xs text-[#716A73]">Interactive AI Conversations</p>
              </div>
            </div>

            {/* Quick Actions & Recent Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Articles */}
              <div className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-serif font-bold text-[#3B214F]">Recent Articles</h3>
                  <button
                    onClick={() => { setActiveTab('articles'); setShowArticleModal(true); }}
                    className="bg-[#6E3A82] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-[#8B4FA0]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Story
                  </button>
                </div>

                <div className="divide-y divide-[#E8DDF0]">
                  {articlesList.slice(0, 3).map((art) => (
                    <div key={art.id} className="py-3 flex justify-between items-center text-sm">
                      <div>
                        <p className="font-semibold text-[#3B214F]">{art.title}</p>
                        <span className="text-xs text-[#716A73]">{art.category} • {art.publishedAt}</span>
                      </div>
                      <span className="text-xs font-medium px-3 py-1 bg-[#F4ECF7] text-[#6E3A82] rounded-full">
                        Published
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Gallery Highlights */}
              <div className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-serif font-bold text-[#3B214F]">Media Gallery Albums</h3>
                  <button
                    onClick={() => { setActiveTab('gallery'); openNewGalleryModal(); }}
                    className="bg-[#6E3A82] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-[#8B4FA0]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Upload Album
                  </button>
                </div>

                <div className="divide-y divide-[#E8DDF0]">
                  {galleryList.slice(0, 3).map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between text-sm gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#3B214F] truncate">{item.title}</p>
                          <span className="text-xs text-[#716A73]">{item.category} • {item.date}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 bg-[#F4ECF7] text-[#6E3A82] rounded-full shrink-0">
                        {item.photoCount || (item.photos?.length || 1)} Photos
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLES TAB */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#3B214F]">Articles & Stories Manager</h1>
                <p className="text-xs text-[#716A73]">Manage content for the Impact Stories hub.</p>
              </div>
              <button
                onClick={openNewArticleModal}
                className="bg-[#6E3A82] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#8B4FA0]"
              >
                <Plus className="w-4 h-4" />
                Create New Article
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articlesList.map((art) => (
                <div key={art.id} className="bg-white p-5 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    {art.featuredImageUrl && (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={art.featuredImageUrl}
                          alt={art.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold px-3 py-1 bg-[#F4ECF7] text-[#6E3A82] rounded-full">
                        {art.category}
                      </span>
                      <span className="text-[11px] text-[#A088B0]">{art.readingTime}</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#3B214F] line-clamp-2">{art.title}</h3>
                    <p className="text-xs text-[#716A73] line-clamp-2">{art.excerpt}</p>
                  </div>

                  <div className="pt-3 border-t border-[#E8DDF0] flex justify-between items-center text-xs">
                    <span className="text-[#716A73]">By {art.author.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditArticleModal(art)}
                        className="px-3 py-1 bg-[#F4ECF7] text-[#6E3A82] hover:bg-[#6E3A82] hover:text-white rounded-lg font-semibold transition-colors"
                      >
                        Edit Story & Image
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOARD MEMBERS TAB */}
        {activeTab === 'board' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#3B214F]">Board Members Manager</h1>
              <p className="text-xs text-[#716A73] mt-1">
                Edit board member profiles shown on the About page. Changes are saved to the database and reflected on the website.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {boardList.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl border border-[#E8DDF0] shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="flex gap-4 p-5">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#3B214F] shrink-0 border border-[#E8DDF0]">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        member.category === 'Founder'
                          ? 'bg-[#C5A880]/20 text-[#8B6A3E]'
                          : 'bg-[#E8DDF0] text-[#6E3A82]'
                      }`}>
                        {member.badge || member.category}
                      </span>
                      <h3 className="font-serif font-bold text-base text-[#3B214F] leading-snug">{member.name}</h3>
                      {member.title && (
                        <p className="text-xs font-semibold text-[#6E3A82] line-clamp-1">{member.title}</p>
                      )}
                      <p className="text-xs text-[#716A73] line-clamp-2 leading-relaxed">{member.biography}</p>
                    </div>
                  </div>

                  {member.expertise && member.expertise.length > 0 && (
                    <div className="px-5 pb-3 flex flex-wrap gap-1.5">
                      {member.expertise.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAF8F5] border border-[#E8DDF0] text-[#3B214F]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="px-5 py-3 border-t border-[#E8DDF0] flex justify-end">
                    <button
                      onClick={() => openEditBoardModal(member)}
                      className="px-4 py-1.5 bg-[#F4ECF7] text-[#6E3A82] hover:bg-[#6E3A82] hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#A088B0] bg-[#FAF8F5] rounded-xl px-4 py-3 border border-[#E8DDF0]">
              ℹ️ To update a board member's photo, click "Edit Profile" and use the photo upload section. Images are stored securely via Vercel Blob.
            </p>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#3B214F]">Media Gallery Management</h1>
                <p className="text-xs text-[#716A73]">
                  Upload and manage photo albums across the 5 core foundation categories.
                </p>
              </div>
              <button
                onClick={openNewGalleryModal}
                className="bg-[#6E3A82] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#8B4FA0] self-start sm:self-auto shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                Upload New Album
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8DDF0]">
              <button
                onClick={() => setGalleryCategoryFilter('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  galleryCategoryFilter === 'All'
                    ? 'bg-[#6E3A82] text-white shadow-sm font-semibold'
                    : 'bg-white border border-[#E8DDF0] text-[#3B214F] hover:border-[#6E3A82]'
                }`}
              >
                All Categories ({galleryList.length})
              </button>
              {GALLERY_CATEGORIES.map((cat) => {
                const count = galleryList.filter((g) => g.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setGalleryCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      galleryCategoryFilter === cat
                        ? 'bg-[#6E3A82] text-white shadow-sm font-semibold'
                        : 'bg-white border border-[#E8DDF0] text-[#3B214F] hover:border-[#6E3A82]'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Gallery Albums Grid */}
            {galleryList.filter((g) => galleryCategoryFilter === 'All' || g.category === galleryCategoryFilter).length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E8DDF0] p-12 text-center space-y-3">
                <ImageIcon className="w-10 h-10 text-[#C5A8D8] mx-auto" />
                <h3 className="font-serif font-bold text-lg text-[#3B214F]">No albums in this category</h3>
                <p className="text-xs text-[#716A73]">Click &quot;Upload New Album&quot; to add photos to {galleryCategoryFilter}.</p>
                <button
                  onClick={openNewGalleryModal}
                  className="bg-[#6E3A82] text-white text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-1.5 hover:bg-[#8B4FA0]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add First Album
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryList
                  .filter((g) => galleryCategoryFilter === 'All' || g.category === galleryCategoryFilter)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#E8DDF0] shadow-sm overflow-hidden flex flex-col justify-between hover:border-[#6E3A82]/50 transition-all group"
                    >
                      <div className="space-y-3">
                        {/* Cover Image & Count Badge */}
                        <div className="relative aspect-[16/10] w-full bg-[#1a0f22] overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase bg-[#3B214F]/90 text-white backdrop-blur-sm border border-white/20">
                              {item.category}
                            </span>
                          </div>
                          <div className="absolute bottom-3 right-3">
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" />
                              {item.photos?.length || item.photoCount || 1} Photos
                            </span>
                          </div>
                        </div>

                        {/* Album Info */}
                        <div className="p-4 space-y-2">
                          <div className="flex items-center gap-2 text-[11px] text-[#A088B0] font-medium">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#6E3A82]" />
                              {item.location}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#6E3A82]" />
                              {item.date}
                            </span>
                          </div>

                          <h3 className="font-serif font-bold text-base text-[#3B214F] line-clamp-1">
                            {item.title}
                          </h3>

                          {item.caption && (
                            <p className="text-xs text-[#716A73] line-clamp-2 leading-relaxed">
                              {item.caption}
                            </p>
                          )}

                          {item.impactHighlight && (
                            <div className="pt-1">
                              <span className="text-[11px] font-semibold text-[#6E3A82] bg-[#F4ECF7] px-2.5 py-0.5 rounded-md inline-block">
                                ✨ {item.impactHighlight}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-4 pt-2 border-t border-[#E8DDF0] flex items-center justify-between text-xs">
                        <Link
                          href={`/gallery/${item.slug}`}
                          target="_blank"
                          className="text-[#6E3A82] hover:text-[#3B214F] font-semibold flex items-center gap-1 text-[11px]"
                        >
                          View Live <ExternalLink className="w-3 h-3" />
                        </Link>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditGalleryModal(item)}
                            className="px-2.5 py-1 bg-[#F4ECF7] text-[#6E3A82] hover:bg-[#6E3A82] hover:text-white rounded-lg font-semibold transition-colors flex items-center gap-1 text-[11px]"
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteGallery(item.id)}
                            className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg font-semibold transition-colors flex items-center gap-1 text-[11px]"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* METRICS TAB */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#3B214F]">Impact Metrics Editor</h1>
              <p className="text-xs text-[#716A73]">Update key foundation achievement numbers shown on the website.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metricsList.map((metric, idx) => (
                <div key={metric.id} className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3B214F] uppercase tracking-wider mb-1">
                      Highlight Number
                    </label>
                    <input
                      type="text"
                      value={metric.number}
                      onChange={(e) => handleUpdateMetric(idx, 'number', e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-4 py-2 text-lg font-serif font-bold text-[#3B214F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3B214F] uppercase tracking-wider mb-1">
                      Metric Label
                    </label>
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => handleUpdateMetric(idx, 'label', e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-4 py-2 text-xs font-medium text-[#3B214F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3B214F] uppercase tracking-wider mb-1">
                      Description
                    </label>
                    <textarea
                      value={metric.description}
                      onChange={(e) => handleUpdateMetric(idx, 'description', e.target.value)}
                      rows={2}
                      className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-4 py-2 text-xs text-[#716A73]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={saveMetrics}
              className="bg-[#6E3A82] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#8B4FA0] transition-all shadow-md"
            >
              Save All Impact Metrics
            </button>
          </div>
        )}

        {/* INSIGHTS TAB */}
        {activeTab === 'insights' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#3B214F]">Advanced Digital Insights</h1>
              <p className="text-xs text-[#716A73]">Platform engagement and visitor intent analysis.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#3B214F] flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#6E3A82]" />
                  Top Visitor Interests (AI Assistant)
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-medium text-[#3B214F] mb-1">
                      <span>Educational Grants & Scholarships</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-[#F4ECF7] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#6E3A82] h-full w-[42%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-medium text-[#3B214F] mb-1">
                      <span>Volunteering & Mentorship</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-[#F4ECF7] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#6E3A82] h-full w-[28%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-medium text-[#3B214F] mb-1">
                      <span>Women Empowerment Incubator</span>
                      <span>18%</span>
                    </div>
                    <div className="w-full bg-[#F4ECF7] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#6E3A82] h-full w-[18%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#3B214F] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#6E3A82]" />
                  User Engagement Summary
                </h3>
                <div className="space-y-3 text-xs text-[#716A73]">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl flex justify-between">
                    <span>Average Session Duration</span>
                    <strong className="text-[#3B214F]">3m 42s</strong>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl flex justify-between">
                    <span>Resource Downloads</span>
                    <strong className="text-[#3B214F]">84 downloads</strong>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl flex justify-between">
                    <span>Donation Page Conversions</span>
                    <strong className="text-[#3B214F]">14.2% engagement</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Edit Board Member */}
        {showBoardModal && editingBoardId && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto border border-[#E8DDF0]">
              <div className="flex justify-between items-center pb-3 border-b border-[#E8DDF0]">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#3B214F]">Edit Board Member Profile</h2>
                  <p className="text-xs text-[#716A73] mt-0.5">Changes are saved to the database and shown on the website immediately.</p>
                </div>
                <button onClick={() => setShowBoardModal(false)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">✕</button>
              </div>

              <form onSubmit={handleSaveBoardMember} className="space-y-4 text-xs">
                {/* Photo Upload */}
                <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8DDF0]">
                  <label className="block font-semibold text-[#3B214F]">Profile Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-[#3B214F] border border-[#E8DDF0] shrink-0">
                      <img src={boardForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        ref={boardPhotoInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleBoardPhotoUpload}
                        className="hidden"
                        id="board-photo-input"
                      />
                      <button
                        type="button"
                        disabled={isBoardPhotoUploading}
                        onClick={() => boardPhotoInputRef.current?.click()}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed text-xs font-semibold transition-all ${
                          isBoardPhotoUploading
                            ? 'border-[#6E3A82]/40 text-[#A088B0] cursor-not-allowed bg-[#F4ECF7]/50'
                            : 'border-[#6E3A82]/50 text-[#6E3A82] hover:bg-[#F4ECF7] hover:border-[#6E3A82] cursor-pointer bg-white'
                        }`}
                      >
                        {isBoardPhotoUploading ? (
                          <><span className="w-3.5 h-3.5 border-2 border-[#6E3A82] border-t-transparent rounded-full animate-spin" /> Uploading…</>
                        ) : (
                          <><Upload className="w-3.5 h-3.5" /> Upload New Photo (JPG, PNG, WebP)</>
                        )}
                      </button>
                      <div>
                        <label className="block text-[11px] font-medium text-[#716A73] mb-1">Or paste image URL:</label>
                        <input
                          type="text"
                          value={boardForm.imageUrl}
                          onChange={(e) => setBoardForm({ ...boardForm, imageUrl: e.target.value })}
                          className="w-full bg-white border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                          placeholder="/images/board/name.jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name & Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#3B214F] mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={boardForm.name}
                      onChange={(e) => setBoardForm({ ...boardForm, name: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#3B214F] mb-1">Role / Title</label>
                    <input
                      type="text"
                      value={boardForm.title}
                      onChange={(e) => setBoardForm({ ...boardForm, title: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                      placeholder="e.g. Founder, Board Member"
                    />
                  </div>
                </div>

                {/* Biography */}
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Biography <span className="text-red-500">*</span></label>
                  <textarea
                    required
                    rows={4}
                    value={boardForm.biography}
                    onChange={(e) => setBoardForm({ ...boardForm, biography: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                    placeholder="Professional biography…"
                  />
                </div>

                {/* Background */}
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Professional Background</label>
                  <textarea
                    rows={2}
                    value={boardForm.background}
                    onChange={(e) => setBoardForm({ ...boardForm, background: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                    placeholder="Career and professional experience…"
                  />
                </div>

                {/* Education */}
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Education & Credentials</label>
                  <textarea
                    rows={2}
                    value={boardForm.education}
                    onChange={(e) => setBoardForm({ ...boardForm, education: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                    placeholder="Academic qualifications and professional certifications…"
                  />
                </div>

                {/* Vision */}
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Governance Vision</label>
                  <textarea
                    rows={2}
                    value={boardForm.vision}
                    onChange={(e) => setBoardForm({ ...boardForm, vision: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                    placeholder="Vision and philosophy for governance…"
                  />
                </div>

                {/* Quote */}
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Signature Quote</label>
                  <input
                    type="text"
                    value={boardForm.quote}
                    onChange={(e) => setBoardForm({ ...boardForm, quote: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                    placeholder="An inspiring quote from this board member…"
                  />
                </div>

                {/* Expertise */}
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Areas of Expertise</label>
                  <input
                    type="text"
                    value={boardForm.expertise}
                    onChange={(e) => setBoardForm({ ...boardForm, expertise: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                    placeholder="Separate with commas e.g. Leadership, Nonprofit Strategy, Aviation"
                  />
                  <p className="text-[10px] text-[#A088B0] mt-1">Separate each skill/area with a comma.</p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DDF0]">
                  <button type="button" onClick={() => setShowBoardModal(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-[#716A73] hover:bg-gray-100">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#6E3A82] text-white hover:bg-[#8B4FA0] shadow-md transition-all flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add/Edit Article */}
        {showArticleModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-xl w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-[#E8DDF0]">
              <div className="flex justify-between items-center pb-2 border-b border-[#E8DDF0]">
                <h2 className="text-xl font-serif font-bold text-[#3B214F]">
                  {editingArticleId ? 'Edit Article & Featured Image' : 'Create New Article'}
                </h2>
                <button
                  onClick={() => setShowArticleModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                    placeholder="Article title…"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Category</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                  >
                    <option value="Girls' Development">Girls' Development</option>
                    <option value="Women's Issues">Women's Issues</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Faith">Faith</option>
                    <option value="Foundation News">Foundation News</option>
                  </select>
                </div>

                {/* Featured Image Selection & Preview */}
                <div className="space-y-2 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E8DDF0]">
                  <label className="block font-semibold text-[#3B214F]">Featured Image</label>
                  
                  {articleForm.featuredImageUrl && (
                    <div className="relative w-full h-36 rounded-xl overflow-hidden bg-gray-200 border border-[#E8DDF0]">
                      <img
                        src={articleForm.featuredImageUrl}
                        alt="Article Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                        Current Image
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="block text-[11px] font-medium text-[#716A73] mb-1.5">
                      Choose from Foundation Media Library:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {SAMPLE_IMAGES.map((img) => (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setArticleForm({ ...articleForm, featuredImageUrl: img.url })}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                            articleForm.featuredImageUrl === img.url
                              ? 'bg-[#6E3A82] text-white font-semibold'
                              : 'bg-white border border-[#E8DDF0] text-[#3B214F] hover:border-[#6E3A82]'
                          }`}
                        >
                          {img.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upload from Computer */}
                  <div className="pt-1">
                    <span className="block text-[11px] font-medium text-[#716A73] mb-1.5">
                      Upload from your Computer:
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload-input"
                    />
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed text-[11px] font-semibold transition-all ${
                        isUploading
                          ? 'border-[#6E3A82]/40 text-[#A088B0] cursor-not-allowed bg-[#F4ECF7]/50'
                          : 'border-[#6E3A82]/50 text-[#6E3A82] hover:bg-[#F4ECF7] hover:border-[#6E3A82] cursor-pointer'
                      }`}
                    >
                      {isUploading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-[#6E3A82] border-t-transparent rounded-full animate-spin" />
                          Uploading…
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Click to Upload Image (JPG, PNG, WebP — max 5MB)
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-1">
                    <label className="block text-[11px] font-medium text-[#716A73] mb-1">
                      Or paste Custom Image URL / Path:
                    </label>
                    <input
                      type="text"
                      value={articleForm.featuredImageUrl}
                      onChange={(e) => setArticleForm({ ...articleForm, featuredImageUrl: e.target.value })}
                      className="w-full bg-white border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                      placeholder="/images/your_custom_image.png or https://…"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Excerpt</label>
                  <textarea
                    required
                    rows={2}
                    value={articleForm.excerpt}
                    onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                    placeholder="Short summary excerpt…"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Full Article Content</label>
                  <textarea
                    rows={5}
                    value={articleForm.content}
                    onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                    placeholder="Full article content text…"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DDF0]">
                  <button
                    type="button"
                    onClick={() => setShowArticleModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#716A73] hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#6E3A82] text-white hover:bg-[#8B4FA0] shadow-md"
                  >
                    {editingArticleId ? 'Save Changes' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add/Edit Gallery Album */}
        {showGalleryModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto border border-[#E8DDF0]">
              <div className="flex justify-between items-center pb-3 border-b border-[#E8DDF0]">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#3B214F]">
                    {editingGalleryId ? 'Edit Gallery Album' : 'Upload New Gallery Album'}
                  </h2>
                  <p className="text-xs text-[#716A73] mt-0.5">
                    Categorize and publish photography into the foundation media archives.
                  </p>
                </div>
                <button
                  onClick={() => setShowGalleryModal(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveGallery} className="space-y-5 text-xs">
                {/* Title */}
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">
                    Album / Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3.5 py-2.5 text-xs text-[#3B214F] focus:outline-none focus:ring-2 focus:ring-[#6E3A82]"
                    placeholder="e.g. Grassroots Digital Skills & STEM Bootcamp 2026…"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">
                    Gallery Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3.5 py-2.5 text-xs text-[#3B214F] font-medium focus:outline-none focus:ring-2 focus:ring-[#6E3A82]"
                  >
                    {GALLERY_CATEGORIES.map((cat, idx) => (
                      <option key={cat} value={cat}>
                        {idx + 1}. {cat}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-[#A088B0] mt-1">
                    Choose one of the 5 official foundation program areas.
                  </p>
                </div>

                {/* Date & Location Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#3B214F] mb-1">Date</label>
                    <input
                      type="text"
                      value={galleryForm.date}
                      onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3.5 py-2.5 text-xs text-[#3B214F]"
                      placeholder="e.g. October 2026 or October 12, 2026"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#3B214F] mb-1">Location</label>
                    <input
                      type="text"
                      value={galleryForm.location}
                      onChange={(e) => setGalleryForm({ ...galleryForm, location: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3.5 py-2.5 text-xs text-[#3B214F]"
                      placeholder="e.g. Ikeja, Lagos State"
                    />
                  </div>
                </div>

                {/* Impact Highlight */}
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">
                    Impact Highlight / Milestone (Optional)
                  </label>
                  <input
                    type="text"
                    value={galleryForm.impactHighlight}
                    onChange={(e) => setGalleryForm({ ...galleryForm, impactHighlight: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3.5 py-2.5 text-xs text-[#3B214F]"
                    placeholder="e.g. 250+ Girls Mentored or 150 Seed Grants Distributed"
                  />
                </div>

                {/* Caption / Story */}
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">
                    Album Story / Caption
                  </label>
                  <textarea
                    rows={3}
                    value={galleryForm.caption}
                    onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3.5 py-2.5 text-xs text-[#3B214F]"
                    placeholder="Provide context about what took place during this event or field mission…"
                  />
                </div>

                {/* Cover Photograph Section */}
                <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8DDF0]">
                  <div className="flex justify-between items-center">
                    <label className="block font-semibold text-[#3B214F]">
                      Main Cover Photograph <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] text-[#A088B0]">Primary hero thumbnail</span>
                  </div>

                  {galleryForm.imageUrl && (
                    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-gray-200 border border-[#E8DDF0]">
                      <img
                        src={galleryForm.imageUrl}
                        alt="Album Cover Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2.5 py-0.5 rounded backdrop-blur-sm">
                        Current Cover
                      </span>
                    </div>
                  )}

                  {/* Upload from Computer Button */}
                  <div>
                    <input
                      ref={galleryCoverInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleGalleryCoverUpload}
                      className="hidden"
                      id="gallery-cover-file-input"
                    />
                    <button
                      type="button"
                      disabled={isGalleryCoverUploading}
                      onClick={() => galleryCoverInputRef.current?.click()}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed text-xs font-semibold transition-all ${
                        isGalleryCoverUploading
                          ? 'border-[#6E3A82]/40 text-[#A088B0] cursor-not-allowed bg-[#F4ECF7]/50'
                          : 'border-[#6E3A82]/50 text-[#6E3A82] hover:bg-[#F4ECF7] hover:border-[#6E3A82] cursor-pointer bg-white'
                      }`}
                    >
                      {isGalleryCoverUploading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#6E3A82] border-t-transparent rounded-full animate-spin" />
                          Uploading Cover Photo…
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-[#6E3A82]" />
                          Upload Cover Image from Computer (JPG, PNG, WebP)
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick Select from Library */}
                  <div>
                    <span className="block text-[11px] font-medium text-[#716A73] mb-1.5">
                      Or select from Media Library:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {SAMPLE_IMAGES.map((img) => (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setGalleryForm({ ...galleryForm, imageUrl: img.url })}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                            galleryForm.imageUrl === img.url
                              ? 'bg-[#6E3A82] text-white font-semibold shadow-sm'
                              : 'bg-white border border-[#E8DDF0] text-[#3B214F] hover:border-[#6E3A82]'
                          }`}
                        >
                          {img.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#716A73] mb-1">
                      Or custom Image URL:
                    </label>
                    <input
                      type="text"
                      value={galleryForm.imageUrl}
                      onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                      className="w-full bg-white border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs text-[#3B214F]"
                      placeholder="/images/uploads/my_photo.jpg"
                    />
                  </div>
                </div>

                {/* Additional Album Photos */}
                <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8DDF0]">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="block font-semibold text-[#3B214F]">
                        Additional Album Photos ({galleryForm.photos.length})
                      </label>
                      <p className="text-[10px] text-[#A088B0]">
                        Include multiple photos to create a full multi-shot album viewable in the lightbox & album page.
                      </p>
                    </div>
                  </div>

                  {/* Multi-file Upload Input */}
                  <input
                    ref={galleryExtraPhotosInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleGalleryExtraPhotosUpload}
                    className="hidden"
                    id="gallery-multi-file-input"
                  />
                  <button
                    type="button"
                    disabled={isGalleryExtraUploading}
                    onClick={() => galleryExtraPhotosInputRef.current?.click()}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      isGalleryExtraUploading
                        ? 'border-[#6E3A82]/20 text-[#A088B0] cursor-not-allowed bg-[#F4ECF7]/50'
                        : 'border-[#6E3A82]/30 text-[#6E3A82] hover:bg-[#F4ECF7] bg-white'
                    }`}
                  >
                    {isGalleryExtraUploading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#6E3A82] border-t-transparent rounded-full animate-spin" />
                        Uploading Photos…
                      </>
                    ) : (
                      <>
                        <FolderPlus className="w-4 h-4" />
                        + Upload Additional Photos to Album (Select Multiple Files)
                      </>
                    )}
                  </button>

                  {/* Thumbnails of current photos */}
                  {galleryForm.photos.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                      {galleryForm.photos.map((photo, pIdx) => (
                        <div
                          key={photo.id || pIdx}
                          className="relative aspect-video rounded-lg overflow-hidden border border-[#E8DDF0] group/thumb bg-black"
                        >
                          <img src={photo.url} alt="album photo" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemovePhotoFromAlbum(pIdx)}
                            className="absolute top-1 right-1 bg-red-600/90 text-white rounded p-1 opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setGalleryForm({ ...galleryForm, imageUrl: photo.url })}
                            className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                            title="Set as main cover"
                          >
                            Set as Cover
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DDF0]">
                  <button
                    type="button"
                    onClick={() => setShowGalleryModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#716A73] hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#6E3A82] text-white hover:bg-[#8B4FA0] shadow-md transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {editingGalleryId ? 'Save Album Changes' : 'Publish Gallery Album'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
