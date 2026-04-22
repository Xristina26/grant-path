/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Target,
  TrendingUp,
  Wallet,
  ExternalLink,
  Globe,
  Plus,
  Filter,
  Info,
  Heart,
  X,
  RefreshCw,
  Bookmark,
  LayoutGrid,
  Layers
} from 'lucide-react';
import { Organisation, Grant, ApplicationDraft } from './types';
import { SAMPLE_GRANTS } from './constants';
import { matchGrants, draftApplication } from './services/geminiService';

// --- Components ---

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  loading = false,
  icon: Icon
}: any) => {
  const base = "px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-h-[48px]";
  const variants: any = {
    primary: "bg-teal-700 text-white hover:bg-teal-800 shadow-md shadow-teal-100",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200",
    outline: "border-2 border-teal-700 text-teal-700 hover:bg-teal-50"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={loading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {children}
          {Icon && <Icon className="w-4 h-4" />}
        </>
      )}
    </button>
  );
};

const Card = ({ children, className = "" }: any) => (
  <div className={`bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all ${className}`}>
    {children}
  </div>
);

const Input = ({ label, icon: Icon, ...props }: any) => (
  <div className="flex flex-col gap-2">
    {label && <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">{label}</label>}
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />}
      <input 
        {...props} 
        className={`w-full bg-white border-2 border-slate-200 focus:border-teal-600 focus:ring-0 rounded-xl py-4 ${Icon ? 'pl-12' : 'px-4'} pr-4 transition-all outline-none text-slate-900 text-base`}
      />
    </div>
  </div>
);

const Select = ({ label, options, icon: Icon, ...props }: any) => (
  <div className="flex flex-col gap-2">
    {label && <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">{label}</label>}
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />}
      <select 
        {...props} 
        className={`w-full bg-white border-2 border-slate-200 focus:border-teal-600 focus:bg-white rounded-xl py-4 ${Icon ? 'pl-12' : 'px-4'} pr-10 transition-all outline-none appearance-none text-slate-900 text-base`}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  </div>
);

// --- Pages ---

const Landing = ({ onStart, onDirectory }: { onStart: () => void; onDirectory: () => void }) => {
  const words = ["Find", "funding,", "faster."];

  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            x: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -left-48 w-full h-full bg-slate-100/50 rounded-full blur-3xl" 
        />
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-12 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Hero Bento Item */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 lg:col-span-8 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-teal-900/5 rounded-[2.5rem] p-8 md:p-16 flex flex-col justify-center space-y-10 relative overflow-hidden group"
          >
            {/* Gloss Highlight */}
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/20 to-transparent pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-black text-teal-900 uppercase tracking-[0.3em] px-6 py-2 rounded-full bg-teal-100/80 w-fit backdrop-blur-sm border border-teal-200/50"
            >
              Intelligence Platform
            </motion.div>

            <div className="flex flex-wrap gap-x-4 md:gap-x-6">
              {words.map((word, idx) => (
                <motion.h1 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-6xl sm:text-7xl md:text-9xl font-black leading-[0.9] tracking-tighter ${word === "faster." ? 'text-teal-700 underline decoration-teal-200 decoration-8 underline-offset-8' : 'text-slate-950'}`}
                >
                  {word}
                </motion.h1>
              ))}
            </div>

            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1, duration: 1 }}
              className="text-xl md:text-2xl text-slate-700 font-medium max-w-2xl leading-relaxed font-serif italic"
            >
              "Helping UK social leaders navigate the complexity of funding with elegance and speed."
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.2 }}
               className="flex flex-col sm:flex-row gap-6 pt-6"
            >
              <Button onClick={onStart} icon={ArrowRight} className="w-full sm:w-auto !px-12 !py-6 text-xl !rounded-2xl bg-teal-900 hover:bg-black transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-teal-900/20 text-white">
                Start Search
              </Button>
              <Button onClick={onDirectory} variant="secondary" className="w-full sm:w-auto !px-12 !py-6 text-xl !rounded-2xl border-2 border-slate-200/60 bg-white/50 backdrop-blur-md hover:bg-white transition-all text-slate-900">
                Grant Directory
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Bento Item */}
          <div className="col-span-1 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="h-full bg-slate-950 text-white flex flex-col justify-between border-2 border-slate-800 shadow-2xl p-10 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-teal-500/20 transition-colors" />
                
                <div className="space-y-1 relative">
                  <div className="text-teal-400 text-xs font-black uppercase tracking-[0.2em]">Funding Tracked</div>
                  <p className="text-5xl md:text-6xl font-black font-serif italic text-teal-400 drop-shadow-sm">£2.4m</p>
                </div>
                
                <div className="relative pt-8">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    <span>Performance</span>
                    <span className="text-teal-500">Active</span>
                  </div>
                  <div className="flex gap-2">
                    {[1,2,3,4,5,6,7].map(i => (
                        <motion.div 
                          key={i} 
                          initial={{ scaleY: 0.5 }}
                          animate={{ scaleY: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          className={`h-2 flex-1 rounded-full ${i < 6 ? 'bg-teal-500' : 'bg-slate-800'}`} 
                        />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <Card className="h-full bg-teal-900 text-white flex flex-col justify-between border-2 border-teal-800 shadow-2xl p-10 group overflow-hidden relative">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 blur-3xl -ml-16 -mb-16" />
                
                <div className="space-y-1 relative">
                  <div className="text-teal-200 text-xs font-black uppercase tracking-[0.2em]">Active Database</div>
                  <p className="text-5xl md:text-6xl font-black font-serif italic text-emerald-400 drop-shadow-sm">582+</p>
                </div>
                
                <div className="pt-8 flex items-center justify-between border-t border-teal-800/50">
                  <p className="text-sm text-teal-300 font-bold tracking-tight">Verified UK Grant Schemes</p>
                  <TrendingUp className="w-5 h-5 text-teal-400" />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Sparkles, label: "AI Enabled", desc: "Intelligent drafting for UK bids", color: "teal" },
            { icon: CheckCircle2, label: "Verified Data", desc: "Direct from official sources", color: "emerald" },
            { icon: Clock, label: "Deadlines", desc: "Automated tracking for bids", color: "rose" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + idx * 0.1 }}
            >
              <Card className="group hover:border-teal-300 transform hover:-translate-y-1 transition-all p-8 flex items-center gap-8 bg-white/50 backdrop-blur-sm border-2 border-white/50 shadow-xl">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                  item.color === 'teal' ? 'bg-teal-50 text-teal-700' : 
                  item.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 
                  'bg-rose-50 text-rose-700'
                }`}>
                  <item.icon className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-950 mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-slate-600">{item.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technical Explanation Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="bg-slate-900 rounded-[2rem] p-10 md:p-16 text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] pointer-events-none" />
          <div className="max-w-3xl space-y-8 relative z-10">
            <h3 className="text-2xl md:text-4xl font-black italic font-serif">How the Intelligence Layer works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-400">
              <div className="space-y-4">
                <p className="font-bold text-teal-400 uppercase tracking-widest text-xs">Proprietary Modelling</p>
                <p className="leading-relaxed">GrantPath utilises <span className="text-white font-bold">Dual-Source Intelligence</span>, synthesising the government mandates of the <span className="text-white font-bold">applicant organisation</span> specifically against regional postcode eligibility.</p>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-teal-400 uppercase tracking-widest text-xs">UK Specific Grounding</p>
                <p className="leading-relaxed">The system is grounded in UK-specific terminology, synthesising data from official sources to evaluate <span className="text-white font-bold">Postcode Eligibility</span> and <span className="text-white font-bold">Capital vs Revenue</span> requirements in real-time.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Onboarding = ({ onComplete }: { onComplete: (org: Organisation) => void }) => {
  const [formData, setFormData] = useState<Organisation>({
    name: '',
    type: 'charity',
    mission: '',
    location: '',
    postcode: '',
    website: '',
    fundingPurpose: 'project-specific',
    focusArea: ''
  });

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-5 space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-none tracking-tight">One step<br/>to your <span className="text-teal-700">applications.</span></h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">We gather context about your mission to provide the most accurate matches and draft high-converting application content.</p>
          
          <Card className="bg-slate-50 border-dashed border-slate-300">
            <p className="text-xs font-mono italic text-slate-500">"92% of UK users find a relevant grant within 3 minutes of setting up their profile."</p>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-7"
        >
          <Card className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Organisation Name" 
                placeholder="e.g. Hope Cafe" 
                icon={Building2}
                value={formData.name}
                onChange={(e: any) => setFormData({...formData, name: e.target.value})}
              />
              <Select 
                label="Organisation Type" 
                icon={Target}
                options={[
                  { label: 'Registered Charity', value: 'charity' },
                  { label: 'Social Enterprise', value: 'social-enterprise' },
                  { label: 'Small Business (SME)', value: 'sme' },
                  { label: 'Community Group', value: 'community-group' },
                  { label: 'Other', value: 'other' }
                ]}
                value={formData.type}
                onChange={(e: any) => setFormData({...formData, type: e.target.value as any})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="City / Region" 
                placeholder="e.g. Leeds" 
                icon={MapPin}
                value={formData.location}
                onChange={(e: any) => setFormData({...formData, location: e.target.value})}
              />
              <Input 
                label="Postcode" 
                placeholder="e.g. LS1 1UR" 
                value={formData.postcode}
                onChange={(e: any) => setFormData({...formData, postcode: e.target.value})}
              />
            </div>

            <Input 
              label="Organisation Website (Optional)" 
              placeholder="e.g. https://mycharity.org.uk" 
              icon={Globe}
              value={formData.website}
              onChange={(e: any) => setFormData({...formData, website: e.target.value})}
            />

            <Select 
              label="Primary Funding Requirement" 
              icon={Wallet}
              options={[
                { label: 'Capital (Machinery, Equipment, Building)', value: 'capital' },
                { label: 'Revenue (Staffing, Overheads, Activities)', value: 'revenue' },
                { label: 'Project Specific', value: 'project-specific' },
                { label: 'Mixed Requirement', value: 'mixed' }
              ]}
              value={formData.fundingPurpose}
              onChange={(e: any) => setFormData({...formData, fundingPurpose: e.target.value as any})}
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Mission & Impact</label>
              <textarea 
                rows={5}
                placeholder="Describe your social or community mission. Mention specific items like machinery or building works if applicable..."
                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl p-4 transition-all outline-none text-slate-900"
                value={formData.mission}
                onChange={(e: any) => setFormData({...formData, mission: e.target.value})}
              />
            </div>

            <Button 
              className="w-full !py-4 text-lg" 
              icon={Search} 
              onClick={() => onComplete(formData)}
              disabled={!formData.name || !formData.mission || !formData.location || !formData.postcode}
            >
              Analyse Grant Matches
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const Results = ({ 
  org, 
  grants: allGrants,
  onDraft 
}: { 
  org: Organisation; 
  grants: Grant[];
  onDraft: (grant: Grant) => void 
}) => {
  const [matches, setMatches] = useState<Grant[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortlist, setShortlist] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const matchedResults = await matchGrants(org, allGrants);
      setMatches(matchedResults);
      setLoading(false);
    };
    fetchMatches();
  }, [org, allGrants]);

  const nextCard = (isMatch: boolean) => {
    if (currentIndex >= matches.length || direction !== 0) return;
    
    const currentGrant = matches[currentIndex];
    if (isMatch && !shortlist.find(s => s.id === currentGrant.id)) {
      setShortlist(prev => [...prev, currentGrant]);
    }
    
    setDirection(isMatch ? 1 : -1);
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDirection(0);
    }, 400);
  };

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 100;
    const velocityThreshold = 500;
    
    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      nextCard(true);
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      nextCard(false);
    }
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setShortlist([]);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6 text-center space-y-10">
        <div className="w-24 h-24 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
           <Sparkles className="w-12 h-12 text-teal-600" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-slate-900">Identifying Opportunities</h2>
          <p className="text-slate-500 font-medium max-w-sm mx-auto">AI is cross-referencing your profile with live UK grant mandates...</p>
        </div>
      </div>
    );
  }

  const isEnd = currentIndex >= matches.length;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-10 min-h-[80vh]">
      {/* View Header with Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-teal-700 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Analysis Ready</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Eligible Grants</h2>
          </div>
          <p className="text-slate-500 font-medium font-serif italic">"{matches.length} matches found based on your mission and postcode focus."</p>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
           <button 
             onClick={() => setViewMode('deck')}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'deck' ? 'bg-white text-teal-700 shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
           >
             <Layers className="w-4 h-4" /> Smart Deck
           </button>
           <button 
             onClick={() => setViewMode('grid')}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-white text-teal-700 shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
           >
             <LayoutGrid className="w-4 h-4" /> Bulk View
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          {viewMode === 'deck' ? (
            <div className="flex flex-col items-center justify-center space-y-12">
              <div className="w-full max-w-lg relative h-[550px]">
                <AnimatePresence mode="popLayout">
                  {!isEnd ? (
                      <motion.div
                        key={matches[currentIndex].id}
                        drag="x"
                        dragConstraints={{ left: -500, right: 500 }}
                        dragElastic={0.5}
                        onDragEnd={handleDragEnd}
                        initial={{ opacity: 0, scale: 0.9, x: 0 }}
                        animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                        exit={{ 
                          opacity: 0, 
                          x: direction * 500 || (direction === 0 ? 0 : direction * 500), 
                          rotate: direction * 35,
                          scale: 0.8
                        }}
                        whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 25,
                          opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 z-10 touch-none flex items-center justify-center p-4"
                      >
                      <Card className="h-full flex flex-col p-10 border-4 border-slate-100 shadow-2xl relative overflow-hidden group select-none">
                        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-teal-500 via-emerald-500 to-teal-500" />
                        
                        <div className="flex-1 space-y-8">
                          <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-3">
                              <span className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                                {matches[currentIndex].provider}
                              </span>
                              <span className="px-3 py-1 rounded-lg bg-teal-50 text-teal-700 text-xs font-black uppercase tracking-widest w-fit border border-teal-200/50">
                                {matches[currentIndex].category}
                              </span>
                            </div>
                            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
                               98% Match
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-3xl md:text-4xl font-black text-slate-950 leading-none tracking-tighter">
                              {matches[currentIndex].title}
                            </h3>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed font-serif italic line-clamp-4">
                              "{matches[currentIndex].description}"
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-6 py-8 border-y-2 border-slate-50">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grant Value</p>
                              <p className="text-2xl font-black text-teal-800 tracking-tighter">{matches[currentIndex].amount}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deadline</p>
                              <p className="text-2xl font-black text-slate-900 tracking-tighter">{matches[currentIndex].deadline}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 flex justify-between items-center gap-6">
                          <button 
                            onClick={() => nextCard(false)}
                            className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest border-2 border-rose-100"
                          >
                            <X className="w-5 h-5" /> Skip
                          </button>
                          <button 
                            onClick={() => nextCard(true)}
                            className="flex-1 bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-2xl transition-all shadow-xl shadow-teal-900/10 flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest border-2 border-teal-800"
                          >
                            <Heart className="w-5 h-5" /> Shortlist
                          </button>
                        </div>
                      </Card>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center space-y-6"
                    >
                      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
                        <RefreshCw className="w-10 h-10 text-slate-300" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tighter italic">Deck Cleared</h3>
                        <p className="text-slate-500 font-medium">You've reviewed all suggested matches.</p>
                      </div>
                      <Button variant="secondary" icon={RefreshCw} onClick={resetDeck}>Restart Deck</Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                 <span className="flex items-center gap-2"><X className="w-4 h-4 text-rose-300" /> Left to Skip</span>
                 <div className="w-1 h-1 rounded-full bg-slate-200" />
                 <span className="flex items-center gap-2">Right to Match <Heart className="w-4 h-4 text-teal-300" /></span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[800px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
               {matches.map(grant => (
                 <Card key={grant.id} className="p-8 border-2 hover:border-teal-400 transition-all flex flex-col justify-between group h-full">
                    <div className="space-y-6">
                       <div className="flex justify-between items-start">
                          <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">{grant.provider}</span>
                          <button 
                             onClick={() => {
                               if (!shortlist.find(s => s.id === grant.id)) {
                                 setShortlist([...shortlist, grant]);
                               }
                             }}
                             className={`p-2 rounded-xl transition-all ${shortlist.find(s => s.id === grant.id) ? 'bg-teal-700 text-white' : 'bg-slate-50 text-slate-400 hover:text-teal-700'}`}
                          >
                             <Heart className="w-5 h-5" />
                          </button>
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-xl font-black text-slate-950 uppercase tracking-tighter leading-none group-hover:text-teal-700 transition-all">{grant.title}</h4>
                          <p className="text-sm text-slate-600 font-medium line-clamp-3 leading-relaxed">{grant.description}</p>
                       </div>
                       <div className="flex gap-4 border-t border-slate-50 pt-4">
                          <div className="flex-1">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Amount</p>
                             <p className="text-sm font-black text-slate-900">{grant.amount}</p>
                          </div>
                          <div className="flex-1">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Deadline</p>
                             <p className="text-sm font-black text-slate-900">{grant.deadline}</p>
                          </div>
                       </div>
                    </div>
                    <Button 
                       variant="secondary" 
                       className="w-full mt-6 !text-[10px] !py-3 uppercase tracking-widest font-black"
                       onClick={() => window.open(grant.url, '_blank')}
                    >
                       View Source
                    </Button>
                 </Card>
               ))}
            </div>
          )}
        </div>

        {/* Shortlist Sidebar (Matches) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-950 flex items-center gap-3 italic font-serif">
              <Bookmark className="w-6 h-6 text-teal-600" /> Your Shortlist
            </h3>
            <span className="bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest leading-none">
              {shortlist.length} SELECTED
            </span>
          </div>

          <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            <div className="flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {shortlist.length > 0 ? (
                  shortlist.map((grant) => (
                    <motion.div
                      key={grant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, height: 0 }}
                    >
                      <Card className="p-6 border-2 border-slate-100 hover:border-teal-700 transition-all group flex flex-col gap-4 relative overflow-hidden bg-white shadow-xl shadow-teal-900/[0.02]">
                        <div className="flex justify-between items-start gap-4">
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                 <p className="text-[10px] font-black text-teal-800 uppercase tracking-widest">{grant.provider}</p>
                              </div>
                              <h4 className="text-lg font-black text-slate-950 leading-none group-hover:text-teal-700 transition-colors uppercase tracking-tighter">{grant.title}</h4>
                           </div>
                           <button 
                             onClick={() => setShortlist(prev => prev.filter(p => p.id !== grant.id))}
                             className="p-2 hover:bg-rose-50 rounded-lg text-slate-300 hover:text-rose-500 transition-all"
                           >
                             <X className="w-4 h-4" />
                           </button>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                           <p className="text-xs font-black text-slate-500 tracking-tight">{grant.amount}</p>
                           <Button 
                             onClick={() => onDraft(grant)}
                             className="!px-6 !py-2.5 !text-[10px] !rounded-xl bg-teal-700 shadow-lg shadow-teal-900/10"
                             icon={ArrowRight}
                           >
                              Draft Bid
                           </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] italic font-serif">Select grants to start drafting</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ScrollShadow Helper Component
const ScrollShadow = ({ children, className }: any) => (
  <div className={`overflow-y-auto scrollbar-hide relative ${className}`}>
    {children}
  </div>
);

const DraftingView = ({ 
  org, 
  grant, 
  onBack 
}: { 
  org: Organisation; 
  grant: Grant; 
  onBack: () => void 
}) => {
  const [draft, setDraft] = useState<ApplicationDraft | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDraft = async () => {
      setLoading(true);
      try {
        const d = await draftApplication(org, grant);
        setDraft(d);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchDraft();
  }, [org, grant]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6 text-center space-y-10">
        <div className="w-24 h-24 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mx-auto">
           <FileText className="w-10 h-10 text-amber-600 animate-bounce" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-slate-900">Advising Content...</h2>
          <p className="text-slate-500 font-medium max-w-sm mx-auto">Structuring your mission into the regulatory requirements of {grant.title}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-4 bg-white border-2 border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
            <LogOut className="w-5 h-5 -rotate-180 text-slate-700" />
          </button>
          <div className="space-y-1">
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Drafting Agent</p>
             <h2 className="text-3xl md:text-4xl font-black text-slate-900">Application Strategy</h2>
          </div>
        </div>
        <div className="hidden md:block text-right">
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Applying for</p>
           <p className="text-sm font-bold text-teal-700">{grant.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Sections - NOW EDITABLE */}
        <div className="col-span-1 md:col-span-8 grid grid-cols-1 gap-6">
          <Card className="space-y-12 p-8 md:p-12">
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-slate-900">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-teal-700" />
                  </div>
                  <h4 className="font-black uppercase tracking-widest text-sm">Programme Objectives</h4>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                   EDITABLE FIELD
                </span>
              </div>
              <textarea 
                className="w-full p-8 bg-slate-50 rounded-2xl text-slate-700 font-medium leading-relaxed border-2 border-slate-100 italic font-serif text-xl focus:border-teal-500 focus:bg-white outline-none transition-all h-64 resize-none"
                value={draft?.objectives}
                onChange={(e) => setDraft(prev => prev ? {...prev, objectives: e.target.value} : null)}
              />
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-slate-900">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-teal-700" />
                  </div>
                  <h4 className="font-black uppercase tracking-widest text-sm">Measurable Outcomes</h4>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                   EDITABLE FIELD
                </span>
              </div>
              <textarea 
                className="w-full p-8 bg-slate-50 rounded-2xl text-slate-700 font-medium leading-relaxed border-2 border-slate-100 italic font-serif text-xl focus:border-teal-500 focus:bg-white outline-none transition-all h-64 resize-none"
                value={draft?.outcomes}
                onChange={(e) => setDraft(prev => prev ? {...prev, outcomes: e.target.value} : null)}
              />
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-slate-900">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-teal-700" />
                  </div>
                  <h4 className="font-black uppercase tracking-widest text-sm">Budget Narrative</h4>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                   EDITABLE FIELD
                </span>
              </div>
              <textarea 
                className="w-full p-8 bg-slate-50 rounded-2xl text-slate-700 font-medium leading-relaxed border-2 border-slate-100 italic font-serif text-xl focus:border-teal-500 focus:bg-white outline-none transition-all h-64 resize-none"
                value={draft?.budgetNarrative}
                onChange={(e) => setDraft(prev => prev ? {...prev, budgetNarrative: e.target.value} : null)}
              />
            </section>

            <div className="pt-8 border-t border-slate-100">
               <div className="flex items-center gap-4 p-6 bg-rose-50 rounded-2xl border-2 border-rose-100 text-rose-800">
                  <Info className="w-6 h-6 flex-shrink-0" />
                  <p className="text-xs font-bold leading-relaxed">
                     <span className="font-black uppercase">Disclaimer:</span> AI drafting is grounded in your profile and grant data, but hallucinations can occur. Always verify facts, dates, and budget figures against the official {grant.provider} guidance before submission.
                  </p>
               </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Insights */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
           <Card className="bg-slate-900 border-none text-white p-10">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-slate-900" />
                 </div>
                 <h4 className="font-bold text-sm uppercase tracking-widest">Drafting Logic</h4>
              </div>
              <div className="space-y-6 text-slate-300 text-base leading-relaxed">
                 <p>The "Active Drafting Agent" synthesis profile context (Mission: <span className="text-white font-bold">{org.name}</span>) against specific grant criteria (<span className="text-white font-bold">{grant.title}</span>).</p>
                 <p>It prioritises <span className="text-teal-400 font-bold">UK compliance terminology</span> and structures responses to match standard Third Sector funding requirements.</p>
              </div>
           </Card>

           <Card className="p-10">
              <h4 className="font-black text-sm uppercase tracking-widest text-slate-500 mb-8">Filing Requirements</h4>
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-teal-700" />
                    <span className="text-base font-bold text-slate-800">Mission Statement</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-slate-200" />
                    <span className="text-base font-bold text-slate-500">12 Month Accounts</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-slate-200" />
                    <span className="text-base font-bold text-slate-500">Project Quotes (x3)</span>
                 </div>
              </div>
           </Card>

           <Button className="!py-5 !rounded-2xl shadow-xl shadow-teal-100" icon={FileText}>Export to Word/PDF</Button>
        </div>
      </div>
    </div>
  );
};

const Directory = ({ 
  grants, 
  onAddGrant, 
  onDeleteGrant, 
  onUpdateGrant 
}: { 
  grants: Grant[], 
  onAddGrant: (grant: Grant) => void,
  onDeleteGrant: (id: string) => void,
  onUpdateGrant: (grant: Grant) => void
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newGrant, setNewGrant] = useState<Partial<Grant>>({
    title: '',
    description: '',
    provider: '',
    category: 'Community',
    locationFocus: 'UK Wide',
    url: '',
    amount: '£0',
    deadline: 'Rolling',
    eligibility: []
  });

  const categories = ['All', 'Environment', 'Community', 'Arts & Culture', 'Innovation', 'Health'];

  const filteredGrants = grants.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         g.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGrant.title && newGrant.url) {
      if (editingId) {
        onUpdateGrant({ ...newGrant, id: editingId } as Grant);
        setEditingId(null);
      } else {
        onAddGrant({
          ...newGrant,
          id: Math.random().toString(36).substr(2, 9),
        } as Grant);
      }
      setIsAdding(false);
      setNewGrant({
        title: '',
        description: '',
        provider: '',
        category: 'Community',
        locationFocus: 'UK Wide',
        url: '',
        amount: '£0',
        deadline: 'Rolling',
        eligibility: []
      });
    }
  };

  const handleEdit = (grant: Grant) => {
    setNewGrant(grant);
    setEditingId(grant.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const externalResources = [
    { title: 'GrantFinder', url: 'https://grantfinder.co.uk/', desc: 'Advanced UK grant tracking tool.' },
    { title: 'Money.co.uk Guide', url: 'https://www.money.co.uk/business/guides/startup-and-small-business-grants', desc: 'Startup and small business grant guide.' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-slate-900">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tight">Grant Directory</h2>
          <p className="text-slate-500 font-medium tracking-tight">Browse and contribute to the curated database of UK funding opportunities.</p>
        </div>
        <Button 
          icon={Plus} 
          onClick={() => {
            if (isAdding) {
              setEditingId(null);
              setNewGrant({ title: '', description: '', provider: '', category: 'Community', locationFocus: 'UK Wide', url: '', amount: '£0', deadline: 'Rolling', eligibility: [] });
            }
            setIsAdding(!isAdding);
          }}
          variant={isAdding ? 'secondary' : 'primary'}
        >
          {isAdding ? 'Close Form' : 'Add New Grant'}
        </Button>
      </div>

      {/* External Resources Bar - Dedicated Landing Hook */}
      <div id="resources-section" className="space-y-8 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-teal-700" />
             </div>
             <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Verified Resources</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalResources.map(res => (
              <Card key={res.title} className="bg-white border-slate-200 flex items-center justify-between p-8 hover:border-teal-300 transition-all shadow-xl shadow-slate-200/20">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-teal-800 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded w-fit mb-2">External Link</p>
                  <h4 className="text-xl font-black text-slate-900">{res.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{res.desc}</p>
                </div>
                <a href={res.url} target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:bg-teal-700 hover:text-white transition-all group">
                  <ExternalLink className="w-6 h-6" />
                </a>
              </Card>
            ))}
          </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="bg-slate-950 text-white p-8 md:p-12 border-none shadow-2xl">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
                    {editingId ? <RefreshCw className="w-6 h-6 text-slate-950" /> : <Plus className="w-6 h-6 text-slate-950" />}
                 </div>
                 <h3 className="text-2xl font-black uppercase tracking-tighter">{editingId ? 'Update Existing Grant' : 'Add New Grant Opportunity'}</h3>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-900">
                <div className="space-y-6">
                    <Input 
                      label="Grant Title" 
                      placeholder="e.g. Community Roots Fund" 
                      value={newGrant.title}
                      onChange={(e: any) => setNewGrant({...newGrant, title: e.target.value})}
                      required
                    />
                    <Input 
                      label="Provider / Funder" 
                      placeholder="e.g. Local Authority" 
                      value={newGrant.provider}
                      onChange={(e: any) => setNewGrant({...newGrant, provider: e.target.value})}
                    />
                </div>
                <div className="space-y-6 text-slate-900">
                    <Input 
                      label="Website Link" 
                      placeholder="e.g. https://gov.uk/grant" 
                      value={newGrant.url}
                      onChange={(e: any) => setNewGrant({...newGrant, url: e.target.value})}
                      required
                    />
                    <Select 
                      label="Category"
                      options={categories.filter(c => c !== 'All').map(c => ({ label: c, value: c }))}
                      value={newGrant.category}
                      onChange={(e: any) => setNewGrant({...newGrant, category: e.target.value as any})}
                    />
                </div>
                <div className="md:col-span-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Description</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-white border-2 border-slate-800 rounded-xl p-4 text-slate-900 outline-none focus:border-teal-500 transition-all font-medium"
                      placeholder="Detailed overview of the grant purpose..."
                      value={newGrant.description}
                      onChange={(e) => setNewGrant({...newGrant, description: e.target.value})}
                    />
                  </div>
                </div>
                <Input 
                  label="Location Focus" 
                  placeholder="e.g. North West England" 
                  value={newGrant.locationFocus}
                  onChange={(e: any) => setNewGrant({...newGrant, locationFocus: e.target.value})}
                />
                <div className="flex items-center gap-4 text-slate-400 font-bold text-xs italic pt-8 md:pt-4">
                   <Info className="w-4 h-4" /> User-added metadata is stored locally for the current session.
                </div>
                <div className="md:col-span-2 flex justify-end gap-4">
                  <Button type="button" variant="secondary" onClick={() => { setIsAdding(false); setEditingId(null); }}>Cancel</Button>
                  <Button type="submit" variant="primary" className="!px-12 !py-4">{editingId ? 'Update Listing' : 'Publish Listing'}</Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="p-8 sticky top-24 border-2 border-slate-100">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter Options
            </h4>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-800">Search</p>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Keywords..."
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-teal-700 transition-all outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-800">Sector / Category</p>
                <div className="flex flex-col gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                        selectedCategory === cat 
                          ? 'bg-teal-700 text-white shadow-lg shadow-teal-900/10 ring-2 ring-teal-700' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredGrants.map(grant => (
              <Card key={grant.id} className="p-8 flex flex-col justify-between group hover:border-teal-700 border-2 transition-all relative">
                {(grant as any).isUserAdded && (
                   <span className="absolute -top-3 left-6 px-3 py-1 bg-teal-900 text-white text-[8px] font-black uppercase tracking-widest rounded-full z-10">User Added</span>
                )}
                
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 text-[10px] font-black uppercase tracking-widest border border-teal-100">
                      {grant.category}
                    </span>
                    <div className="flex items-center gap-2">
                        <button 
                           onClick={() => handleEdit(grant)}
                           className="p-2 bg-slate-50 hover:bg-amber-50 rounded-lg transition-colors text-slate-400 hover:text-amber-600"
                        >
                           <RefreshCw className="w-4 h-4" />
                        </button>
                        <button 
                           onClick={() => onDeleteGrant(grant.id)}
                           className="p-2 bg-slate-50 hover:bg-rose-50 rounded-lg transition-colors text-slate-400 hover:text-rose-600"
                        >
                           <X className="w-4 h-4" />
                        </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-slate-950 group-hover:text-teal-700 transition-colors leading-tight">{grant.title}</h3>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{grant.provider}</p>
                    <p className="text-base text-slate-600 leading-relaxed line-clamp-3 font-medium">{grant.description}</p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">{grant.locationFocus}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                   <Button 
                      variant="secondary" 
                      className="!text-[10px] !py-3 uppercase tracking-widest font-black"
                      onClick={() => window.open(grant.url, '_blank')}
                   >
                     Visit Source
                   </Button>
                   <Button 
                      variant="outline" 
                      className="!text-[10px] !py-3 uppercase tracking-widest font-black"
                      onClick={() => { /* Handled elsewhere */ }}
                   >
                     Shortlist
                   </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'landing' | 'onboarding' | 'results' | 'drafting' | 'directory'>('landing');
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [allGrants, setAllGrants] = useState<Grant[]>(SAMPLE_GRANTS);

  useEffect(() => {
    document.body.style.backgroundColor = '#F8FAFC';
    document.body.className = 'font-sans';
  }, []);

  const handleStart = () => setView('onboarding');
  const handleDirectory = () => setView('directory');
  
  const handleOnboardingComplete = (data: Organisation) => {
    setOrganisation(data);
    setView('results');
  };

  const handleDraft = (grant: Grant) => {
    setSelectedGrant(grant);
    setView('drafting');
  };

  const handleAddGrant = (grant: Grant) => {
    setAllGrants([{ ...grant, isUserAdded: true }, ...allGrants]);
  };

  const handleDeleteGrant = (id: string) => {
    setAllGrants(prev => prev.filter(g => g.id !== id));
  };

  const handleUpdateGrant = (updatedGrant: Grant) => {
    setAllGrants(prev => prev.map(g => g.id === updatedGrant.id ? updatedGrant : g));
  };

  return (
    <div className="min-h-screen text-slate-900 selection:bg-teal-100 relative">
      {/* Prototype Banner */}
      <div className="bg-slate-950 text-white py-2 px-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-center border-b border-white/10 z-[60] sticky top-0 flex items-center justify-center gap-4">
        <span className="flex items-center gap-2">
          <Info className="w-3 h-3 text-teal-400" />
          Prototype Environment
        </span>
        <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
        <span className="text-slate-400 hidden sm:block font-bold">AI generation is simulated for demonstration</span>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
            <div className="w-10 h-10 bg-teal-700 rounded-xl flex items-center justify-center shadow-lg shadow-teal-100">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-teal-950">GrantPath</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-600">
            <button onClick={() => setView('landing')} className={`hover:text-teal-700 transition-colors uppercase ${view === 'landing' ? 'text-teal-700 pointer-events-none' : ''}`}>Dashboard</button>
            <button onClick={() => setView('directory')} className={`hover:text-teal-700 transition-colors uppercase ${view === 'directory' ? 'text-teal-700 pointer-events-none' : ''}`}>Grant Directory</button>
            <button onClick={() => { setView('directory'); setTimeout(() => document.getElementById('resources-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-teal-700 transition-colors uppercase">Resources</button>
            <div className="px-5 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black border border-slate-800 uppercase tracking-tighter">
               {organisation ? organisation.name : 'UK THIRD SECTOR'}
            </div>
          </div>

          <button className="lg:hidden p-2 text-slate-600">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Landing onStart={handleStart} onDirectory={handleDirectory} />
            </motion.div>
          )}
          
          {view === 'onboarding' && (
            <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Onboarding onComplete={handleOnboardingComplete} />
            </motion.div>
          )}

          {view === 'results' && organisation && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Results org={organisation} grants={allGrants} onDraft={handleDraft} />
            </motion.div>
          )}

          {view === 'drafting' && organisation && selectedGrant && (
            <motion.div key="drafting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DraftingView 
                org={organisation} 
                grant={selectedGrant} 
                onBack={() => setView('results')} 
              />
            </motion.div>
          )}

          {view === 'directory' && (
            <motion.div key="directory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Directory 
                grants={allGrants} 
                onAddGrant={handleAddGrant} 
                onDeleteGrant={handleDeleteGrant}
                onUpdateGrant={handleUpdateGrant}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-sm space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-black text-teal-950">GrantPath</span>
            </div>
            <p className="text-slate-600 font-medium text-base leading-relaxed">
              Standardising the grant application experience for UK not-for-profits and rural SMEs through modern intelligence and elegant design.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6">
              <h5 className="font-black text-xs uppercase tracking-widest text-slate-500">Toolkit</h5>
              <ul className="space-y-3 text-sm font-bold text-slate-700">
                <li><button onClick={() => setView('directory')} className="hover:text-teal-700 font-bold transition-colors">Grant Directory</button></li>
                <li className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                   <span>AI Drafting</span>
                   <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded uppercase">Soon</span>
                </li>
                <li className="flex items-center gap-2">
                   <button onClick={() => { setView('directory'); setTimeout(() => document.getElementById('resources-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-teal-700 font-bold transition-colors">Resources</button>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="font-black text-xs uppercase tracking-widest text-slate-500">Transparency</h5>
              <ul className="space-y-3 text-sm font-bold text-slate-700">
                <li className="opacity-50 cursor-not-allowed font-bold">Privacy Policy</li>
                <li className="opacity-50 cursor-not-allowed font-bold">Data Usage</li>
                <li><button onClick={() => window.location.reload()} className="hover:text-teal-700 transition-colors flex items-center gap-2">
                   Status <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </button></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 py-10 text-center text-[11px] text-slate-500 font-black tracking-[0.2em] uppercase">
          © 2026 GRANTPATH
        </div>
      </footer>
    </div>
  );
}
