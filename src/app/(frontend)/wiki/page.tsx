'use client';
import { useState, useEffect, useRef } from 'react';
import { ShineBorder } from '@/components/magicui/shine-border';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  BookOpen,
  Filter,
  LayoutGrid,
  LayoutList,
  Clock,
  BookMarked,
  Hash,
  Edit3,
  Eye,
} from 'lucide-react';
import { AuroraText } from '@/components/magicui/aurora-text';
import Image from 'next/image';

interface WikiArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: string;
  readTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl: string;
  popularityScore: number;
}

type SortOption = 'updated' | 'popularity' | 'readTime';
type FilterDifficulty = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

const getImageUrl = (index: number) => {
  const categories = [
    'wiki',
    'knowledge',
    'documentation',
    'reference',
    'guide',
    'tutorial',
    'education',
    'learning',
  ];
  const category = categories[index % categories.length];
  return `https://placehold.co/600x400?text=${encodeURIComponent(category)}`;
};

const wikiArticles: WikiArticle[] = [
  {
    id: 1,
    title: 'JavaScript Promises Explained',
    summary:
      'A comprehensive guide to understanding and using Promises in JavaScript for asynchronous operations.',
    content: 'Full article content here...',
    category: 'JavaScript',
    tags: ['JavaScript', 'Async', 'Promises', 'ES6'],
    lastUpdated: '2025-05-10',
    readTime: 8,
    difficulty: 'Intermediate',
    imageUrl: getImageUrl(1),
    popularityScore: 856,
  },
  {
    id: 2,
    title: 'React Hooks Complete Reference',
    summary:
      'Everything you need to know about React Hooks, from useState and useEffect to custom hooks.',
    content: 'Full article content here...',
    category: 'React',
    tags: ['React', 'Hooks', 'Frontend', 'JavaScript'],
    lastUpdated: '2025-05-12',
    readTime: 15,
    difficulty: 'Intermediate',
    imageUrl: getImageUrl(2),
    popularityScore: 921,
  },
  {
    id: 3,
    title: 'CSS Grid Layout Masterclass',
    summary: 'Master the CSS Grid Layout system to create complex, responsive layouts with ease.',
    content: 'Full article content here...',
    category: 'CSS',
    tags: ['CSS', 'Layout', 'Web Design', 'Responsive'],
    lastUpdated: '2025-05-05',
    readTime: 10,
    difficulty: 'Beginner',
    imageUrl: getImageUrl(3),
    popularityScore: 734,
  },
  {
    id: 4,
    title: 'Getting Started with TypeScript',
    summary:
      'Your first steps into TypeScript: setup, basic types, interfaces, and working with the compiler.',
    content: 'Full article content here...',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Static Typing', 'Beginner'],
    lastUpdated: '2025-05-08',
    readTime: 12,
    difficulty: 'Beginner',
    imageUrl: getImageUrl(4),
    popularityScore: 812,
  },
  {
    id: 5,
    title: 'Advanced Python Decorators',
    summary:
      'Deep dive into Python decorators, with advanced patterns and real-world applications.',
    content: 'Full article content here...',
    category: 'Python',
    tags: ['Python', 'Decorators', 'Advanced', 'Metaprogramming'],
    lastUpdated: '2025-05-01',
    readTime: 18,
    difficulty: 'Advanced',
    imageUrl: getImageUrl(5),
    popularityScore: 678,
  },
  {
    id: 6,
    title: 'Docker Containerization Fundamentals',
    summary:
      'Learn the core concepts of Docker and containerization to streamline your development workflow.',
    content: 'Full article content here...',
    category: 'DevOps',
    tags: ['Docker', 'Containers', 'DevOps', 'Infrastructure'],
    lastUpdated: '2025-05-09',
    readTime: 14,
    difficulty: 'Intermediate',
    imageUrl: getImageUrl(6),
    popularityScore: 789,
  },
  {
    id: 7,
    title: 'GraphQL API Design Patterns',
    summary: 'Best practices and design patterns for creating scalable, maintainable GraphQL APIs.',
    content: 'Full article content here...',
    category: 'API',
    tags: ['GraphQL', 'API', 'Backend', 'Schema Design'],
    lastUpdated: '2025-05-11',
    readTime: 16,
    difficulty: 'Advanced',
    imageUrl: getImageUrl(7),
    popularityScore: 645,
  },
  {
    id: 8,
    title: 'Modern SASS/SCSS Techniques',
    summary: 'Advanced SASS/SCSS techniques for creating maintainable and scalable stylesheets.',
    content: 'Full article content here...',
    category: 'CSS',
    tags: ['SASS', 'SCSS', 'CSS', 'Stylesheets'],
    lastUpdated: '2025-05-03',
    readTime: 9,
    difficulty: 'Intermediate',
    imageUrl: getImageUrl(8),
    popularityScore: 712,
  },
  {
    id: 9,
    title: 'REST API Best Practices',
    summary:
      'A guide to designing RESTful APIs that are intuitive, efficient, and follow industry standards.',
    content: 'Full article content here...',
    category: 'API',
    tags: ['REST', 'API', 'HTTP', 'Backend'],
    lastUpdated: '2025-05-07',
    readTime: 11,
    difficulty: 'Intermediate',
    imageUrl: getImageUrl(9),
    popularityScore: 876,
  },
  {
    id: 10,
    title: 'Git Workflow Strategies',
    summary:
      'Different Git workflow strategies for teams of various sizes and project complexities.',
    content: 'Full article content here...',
    category: 'Version Control',
    tags: ['Git', 'Version Control', 'Collaboration', 'Workflow'],
    lastUpdated: '2025-05-02',
    readTime: 10,
    difficulty: 'Beginner',
    imageUrl: getImageUrl(10),
    popularityScore: 923,
  },
  {
    id: 11,
    title: 'Test-Driven Development in Practice',
    summary:
      'Practical guide to implementing TDD in your development process with real-world examples.',
    content: 'Full article content here...',
    category: 'Testing',
    tags: ['TDD', 'Testing', 'Quality Assurance', 'Best Practices'],
    lastUpdated: '2025-05-14',
    readTime: 13,
    difficulty: 'Intermediate',
    imageUrl: getImageUrl(11),
    popularityScore: 689,
  },
  {
    id: 12,
    title: 'WebSockets Deep Dive',
    summary: 'Understanding WebSockets from the ground up for real-time web applications.',
    content: 'Full article content here...',
    category: 'Web',
    tags: ['WebSockets', 'Real-time', 'Communication', 'Backend'],
    lastUpdated: '2025-05-06',
    readTime: 15,
    difficulty: 'Advanced',
    imageUrl: getImageUrl(12),
    popularityScore: 745,
  },
  {
    id: 13,
    title: 'Functional Programming in JavaScript',
    summary:
      'Applying functional programming principles in JavaScript for cleaner, more maintainable code.',
    content: 'Full article content here...',
    category: 'JavaScript',
    tags: ['Functional Programming', 'JavaScript', 'Immutability', 'Pure Functions'],
    lastUpdated: '2025-05-04',
    readTime: 12,
    difficulty: 'Intermediate',
    imageUrl: getImageUrl(13),
    popularityScore: 834,
  },
  {
    id: 14,
    title: 'Introduction to Kubernetes',
    summary: 'Getting started with Kubernetes for container orchestration and deployment.',
    content: 'Full article content here...',
    category: 'DevOps',
    tags: ['Kubernetes', 'Containers', 'Orchestration', 'DevOps'],
    lastUpdated: '2025-05-13',
    readTime: 20,
    difficulty: 'Advanced',
    imageUrl: getImageUrl(14),
    popularityScore: 912,
  },
  {
    id: 15,
    title: 'Web Accessibility Guidelines',
    summary:
      'Comprehensive guide to implementing web accessibility features for inclusive web applications.',
    content: 'Full article content here...',
    category: 'Web',
    tags: ['Accessibility', 'A11y', 'WCAG', 'Inclusive Design'],
    lastUpdated: '2025-05-15',
    readTime: 14,
    difficulty: 'Beginner',
    imageUrl: getImageUrl(15),
    popularityScore: 767,
  },
];

const allCategories = [...new Set(wikiArticles.map((article) => article.category))];
const allTags = [...new Set(wikiArticles.flatMap((article) => article.tags))];

const WikiDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredDifficulty, setFilteredDifficulty] = useState<FilterDifficulty>('All');
  const [sortBy, setSortBy] = useState<SortOption>('updated');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [hoveredArticleId, setHoveredArticleId] = useState<number | null>(null);
  const [savedArticles, setSavedArticles] = useState<number[]>([]);
  const itemsPerPage = viewMode === 'grid' ? 6 : 5;
  const filtersRef = useRef<HTMLDivElement>(null);

  const filteredArticles = wikiArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((tag) => article.tags.includes(tag));

    const matchesCategories =
      selectedCategories.length === 0 || selectedCategories.includes(article.category);

    const matchesDifficulty =
      filteredDifficulty === 'All' || article.difficulty === filteredDifficulty;

    return matchesSearch && matchesTags && matchesCategories && matchesDifficulty;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'popularity') {
      return b.popularityScore - a.popularityScore;
    } else if (sortBy === 'readTime') {
      return a.readTime - b.readTime;
    } else {
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
  });

  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);
  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, selectedCategories, filteredDifficulty, sortBy, viewMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setFiltersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedCategories([]);
    setFilteredDifficulty('All');
    setSortBy('updated');
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const toggleSaved = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedArticles((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleArticleClick = () => {
    console.log('Article clicked');
  };

  const CategoryList = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {allCategories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategories.includes(category) ? 'default' : 'outline'}
          className={`cursor-pointer transition-all ${
            selectedCategories.includes(category)
              ? 'bg-teal-600 hover:bg-teal-700'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => toggleCategory(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );

  const TagsList = () => (
    <div className="flex flex-wrap gap-2 mb-4 mt-2">
      {allTags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTags.includes(tag) ? 'default' : 'outline'}
          className={`cursor-pointer transition-all ${
            selectedTags.includes(tag)
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => toggleTag(tag)}
        >
          <Hash className="h-3 w-3 mr-1" /> {tag}
        </Badge>
      ))}
    </div>
  );

  const DifficultyFilter = () => (
    <div className="mb-4">
      <h4 className="text-white font-medium mb-2">Difficulty Level</h4>
      <div className="flex flex-wrap gap-2">
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
          <Badge
            key={level}
            variant={filteredDifficulty === level ? 'default' : 'outline'}
            className={`cursor-pointer transition-all ${
              filteredDifficulty === level
                ? level === 'All'
                  ? 'bg-gray-600'
                  : level === 'Beginner'
                  ? 'bg-green-600'
                  : level === 'Intermediate'
                  ? 'bg-yellow-600'
                  : 'bg-orange-600'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setFilteredDifficulty(level as FilterDifficulty)}
          >
            {level}
          </Badge>
        ))}
      </div>
    </div>
  );

  const renderPagination = () => (
    <div className="flex justify-center items-center gap-2 mt-8 mb-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-800 text-gray-300 hover:bg-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? 'default' : 'outline'}
              size="sm"
              onClick={() => goToPage(pageNum)}
              className={
                currentPage === pageNum
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }
            >
              {pageNum}
            </Button>
          );
        })}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="text-gray-400">...</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(totalPages)}
              className="bg-gray-800 text-gray-300 hover:bg-gray-700"
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-800 text-gray-300 hover:bg-gray-700"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen h-full flex flex-col max-w-screen-xl mx-auto bg-transparent px-4 sm:px-6 md:px-8">
      <div className="top-0 z-20 pt-4 pb-3 mt-[15vh]">
        <div className="w-full max-w-screen px-4 md:px-12 py-10  backdrop-blur-lg rounded-2xl mx-auto shadow-[0_0_30px_rgba(0,255,255,0.1)] relative overflow-hidden">
          <AuroraText className="text-4xl md:text-6xl text-white font-bold tracking-tight mb-4">
            ByteSpace
          </AuroraText>
          <h2 className="text-2xl md:text-4xl text-white font-semibold mb-2">Wiki</h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl">
            Explore a curated collection of knowledge in tech, programming, and innovation.
            Bite-sized insights, always evolving — your go-to reference for everything digital.
          </p>

          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.7)] rounded-full animate-pulse" />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-4 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search wiki articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 bg-gray-800 border-gray-700 text-white w-full"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6 text-gray-400 hover:text-white"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center gap-1"
              >
                <Filter className="h-3.5 w-3.5" />
                Filters
                {(selectedTags.length > 0 ||
                  selectedCategories.length > 0 ||
                  filteredDifficulty !== 'All') && (
                  <Badge className="ml-1 bg-indigo-600 text-white text-xs h-5 min-w-5 flex items-center justify-center p-0">
                    {selectedTags.length +
                      selectedCategories.length +
                      (filteredDifficulty !== 'All' ? 1 : 0)}
                  </Badge>
                )}
              </Button>

              <div className="flex bg-gray-800 rounded-md overflow-hidden">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`rounded-none ${
                    viewMode === 'list' ? 'bg-indigo-600' : 'bg-transparent text-gray-300'
                  }`}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-none ${
                    viewMode === 'grid' ? 'bg-indigo-600' : 'bg-transparent text-gray-300'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant={sortBy === 'updated' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('updated')}
                className={
                  sortBy === 'updated'
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }
              >
                <Clock className="h-3.5 w-3.5 mr-1" /> Latest
              </Button>
              <Button
                variant={sortBy === 'popularity' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('popularity')}
                className={
                  sortBy === 'popularity'
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }
              >
                <Eye className="h-3.5 w-3.5 mr-1" /> Popular
              </Button>
              <Button
                variant={sortBy === 'readTime' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('readTime')}
                className={
                  sortBy === 'readTime'
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }
              >
                <BookOpen className="h-3.5 w-3.5 mr-1" /> Quick Reads
              </Button>
            </div>
          </div>
        </div>
      </div>

      {filtersOpen && (
        <div
          ref={filtersRef}
          className="bg-gray-900 border border-gray-800 rounded-md p-4 mt-2 animate-in fade-in slide-in-from-top duration-200 z-10"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-medium">Wiki Filters</h3>
            {(selectedTags.length > 0 ||
              selectedCategories.length > 0 ||
              filteredDifficulty !== 'All') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white flex items-center gap-1 h-7 px-2"
              >
                <X className="h-3 w-3" /> Clear all
              </Button>
            )}
          </div>

          <div className="border-b border-gray-800 pb-2 mb-2">
            <h4 className="text-white font-medium mb-2">Categories</h4>
            <CategoryList />
          </div>

          <div className="border-b border-gray-800 pb-2 mb-2">
            <h4 className="text-white font-medium mb-2">Tags</h4>
            <TagsList />
          </div>

          <DifficultyFilter />
        </div>
      )}

      <div className="text-sm text-gray-400 mt-4 mb-2 flex justify-between items-center">
        <span>
          Showing {paginatedArticles.length} of {filteredArticles.length} articles
        </span>
        {savedArticles.length > 0 && (
          <Badge className="bg-teal-600/70 text-white flex items-center gap-1">
            <BookMarked className="h-3 w-3" /> {savedArticles.length} Saved
          </Badge>
        )}
      </div>

      {filteredArticles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Search className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-lg">No matching wiki articles found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
          <Button onClick={clearFilters} className="mt-4 bg-indigo-600 hover:bg-indigo-700">
            Clear all filters
          </Button>
        </div>
      )}

      {paginatedArticles.length > 0 && (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'
              : 'flex flex-col gap-4 mt-6'
          }
        >
          {paginatedArticles.map((article) => (
            <Card
              key={article.id}
              className={`relative bg-zinc-800 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-indigo-500/50 cursor-pointer border-0 ${
                viewMode === 'list' ? 'flex' : 'flex flex-col'
              }`}
              onMouseEnter={() => setHoveredArticleId(article.id)}
              onMouseLeave={() => setHoveredArticleId(null)}
              onClick={handleArticleClick}
            >
              <div
                className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-100% h-70  object-cover' : 'aspect-video w-full'
                }`}
              >
                <Image
                  src={'/assets/images/testi_profil/testi1.jpg'}
                  alt="placeholder"
                  fill
                  className="w-full h-full object-cover"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute bottom-2 right-2 h-8 w-8 rounded-full hover:bg-zinc-900 bg-gray-900/80 backdrop-blur-sm transition-opacity duration-200 ${
                    hoveredArticleId === article.id || savedArticles.includes(article.id)
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                  onClick={(e) => toggleSaved(article.id, e)}
                  aria-label={
                    savedArticles.includes(article.id) ? 'Remove from saved' : 'Save article'
                  }
                >
                  {savedArticles.includes(article.id) ? (
                    <BookMarked className="h-4 w-4 text-teal-400" />
                  ) : (
                    <BookOpen className="h-4 w-4 text-white" />
                  )}
                </Button>

                <Badge
                  className={`absolute top-2 left-2 ${
                    article.difficulty === 'Beginner'
                      ? 'bg-green-600/90'
                      : article.difficulty === 'Intermediate'
                      ? 'bg-yellow-600/90'
                      : 'bg-orange-600/90'
                  }`}
                >
                  {article.difficulty}
                </Badge>
              </div>

              <div
                className={`relative z-10 p-4 flex flex-col ${viewMode === 'list' ? 'flex-1' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-white">{article.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap ml-2">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime} min read</span>
                  </div>
                </div>

                <p className="text-sm text-gray-300 line-clamp-2 mb-2">{article.summary}</p>

                <div className="mt-auto flex items-center justify-between">
                  <Badge className="bg-gray-700 text-gray-300 hover:bg-gray-600">
                    {article.category}
                  </Badge>

                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Edit3 className="h-3 w-3" />
                    <span>{new Date(article.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-indigo-900/30 border-indigo-600/30 text-indigo-300 text-xs"
                    >
                      <Hash className="h-2.5 w-2.5 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 3 && (
                    <Badge
                      variant="outline"
                      className="bg-gray-800 border-gray-700 text-gray-400 text-xs"
                    >
                      +{article.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <ShineBorder
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    hoveredArticleId === article.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  duration={2}
                  borderWidth={1}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && renderPagination()}

      <div className="py-8 text-center text-sm text-gray-500">
        <p>ByteSpace Wiki - Last updated: May 15, 2025</p>
      </div>
    </div>
  );
};

export default WikiDashboard;
