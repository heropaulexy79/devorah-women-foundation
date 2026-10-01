'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileText, BarChart3, Image as ImageIcon, Award, LogOut, Plus, CheckCircle, Sparkles, TrendingUp, Users, ShieldCheck, Search } from 'lucide-react';
import { ARTICLES, IMPACT_METRICS, PROGRAMS, GALLERY_ITEMS } from '@/lib/data';

export default function AdminDashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'metrics' | 'insights'>('overview');

  // Article state
  const [articlesList, setArticlesList] = useState(ARTICLES);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: "Girls' Development" as const,
    excerpt: '',
    content: '',
    readingTime: '4 min read',
    authorName: 'Executive Director',
    authorRole: 'Devorah Women Foundation',
    featuredImageUrl: '/images/story_beneficiary.png',
  });

  // Metrics state
  const [metricsList, setMetricsList] = useState(IMPACT_METRICS);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setIsMounted(true);
    const savedToken = localStorage.getItem('devorah_admin_token');
    if (savedToken === 'devorah_admin_session_valid') {
      setIsAuthenticated(true);
    }

    // Fetch dynamic content from API
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.metrics) setMetricsList(data.metrics);
        if (data.articles) setArticlesList(data.articles);
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('devorah_admin_token', data.token);
        setIsAuthenticated(true);
      } else {
        setAuthError(data.message || 'Incorrect Admin Passkey');
      }
    } catch {
      setAuthError('Connection failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('devorah_admin_token');
    setIsAuthenticated(false);
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.excerpt) return;

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_article',
          payload: {
            title: newArticle.title,
            category: newArticle.category,
            excerpt: newArticle.excerpt,
            content: newArticle.content || newArticle.excerpt,
            readingTime: newArticle.readingTime,
            author: { name: newArticle.authorName, role: newArticle.authorRole, avatarUrl: '/images/founder_portrait.png' },
            featuredImageUrl: newArticle.featuredImageUrl,
            featured: true,
          }
        }),
      });
      const data = await res.json();
      if (data.success) {
        setArticlesList([data.article, ...articlesList]);
        setShowArticleModal(false);
        setNewArticle({
          title: '',
          category: "Girls' Development",
          excerpt: '',
          content: '',
          readingTime: '4 min read',
          authorName: 'Executive Director',
          authorRole: 'Devorah Women Foundation',
          featuredImageUrl: '/images/story_beneficiary.png',
        });
        showSuccessNotification('Article created and published successfully!');
      }
    } catch {
      showSuccessNotification('Failed to create article');
    }
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
            <h1 className="text-2xl font-serif font-bold text-[#3B214F]">Devorah Foundation CMS</h1>
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
              <div className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-2">
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

              <div className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-2">
                <div className="flex justify-between items-center text-[#6E3A82]">
                  <ImageIcon className="w-6 h-6" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A088B0]">Gallery</span>
                </div>
                <p className="text-3xl font-serif font-bold text-[#3B214F]">{GALLERY_ITEMS.length}</p>
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

            {/* Recent Articles & Quick Actions */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-serif font-bold text-[#3B214F]">Recent Articles</h3>
                <button
                  onClick={() => { setActiveTab('articles'); setShowArticleModal(true); }}
                  className="bg-[#6E3A82] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-[#8B4FA0]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New Story
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
                onClick={() => setShowArticleModal(true)}
                className="bg-[#6E3A82] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#8B4FA0]"
              >
                <Plus className="w-4 h-4" />
                Create New Article
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articlesList.map((art) => (
                <div key={art.id} className="bg-white p-5 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold px-3 py-1 bg-[#F4ECF7] text-[#6E3A82] rounded-full">
                      {art.category}
                    </span>
                    <span className="text-[11px] text-[#A088B0]">{art.readingTime}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#3B214F] line-clamp-2">{art.title}</h3>
                  <p className="text-xs text-[#716A73] line-clamp-2">{art.excerpt}</p>
                  <div className="pt-3 border-t border-[#E8DDF0] flex justify-between items-center text-xs text-[#716A73]">
                    <span>By {art.author.name}</span>
                    <span>{art.publishedAt}</span>
                  </div>
                </div>
              ))}
            </div>
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

        {/* Modal: Add Article */}
        {showArticleModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-[#E8DDF0]">
              <h2 className="text-xl font-serif font-bold text-[#3B214F]">Create New Article</h2>

              <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs"
                    placeholder="Article title…"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Category</label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value as any })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="Girls' Development">Girls' Development</option>
                    <option value="Women's Issues">Women's Issues</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Faith">Faith</option>
                    <option value="Foundation News">Foundation News</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Excerpt</label>
                  <textarea
                    required
                    rows={2}
                    value={newArticle.excerpt}
                    onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs"
                    placeholder="Short summary excerpt…"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3B214F] mb-1">Full Content</label>
                  <textarea
                    rows={4}
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl px-3 py-2 text-xs"
                    placeholder="Full article content…"
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
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#6E3A82] text-white hover:bg-[#8B4FA0]"
                  >
                    Publish Article
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
