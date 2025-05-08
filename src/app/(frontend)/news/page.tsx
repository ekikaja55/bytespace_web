'use client'
import { useState, useEffect, useRef } from "react";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Card} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Heart,
  Calendar,
  Filter,
  LayoutGrid,
  LayoutList,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: string[];
  popularity: number;
  date: string;
  imageUrl: string;
}

type SortOption = "date" | "popularity";

const getImageUrl = (index: number) => {
  const categories = [
    'programming', 'coding', 'technology', 'data',
    'computer', 'ai', 'developer', 'software'
  ];
  const category = categories[index % categories.length];
  return `/api/placeholder/600/400?text=${category}`;
};

const dummyNews: NewsItem[] = [
  {
    id: 1,
    title: "Top GitHub Repositories in 2025",
    description: "Explore the most starred repositories this year, from AI tools to full-stack boilerplates.",
    link: "https://github.com/trending",
    tags: ["GitHub", "Open Source", "Development"],
    popularity: 987,
    date: "2025-04-30",
    imageUrl: getImageUrl(1)
  },
  {
    id: 2,
    title: "JavaScript Trends You Shouldn't Miss",
    description: "Check out what's hot in the JS ecosystem, including new ECMAScript proposals.",
    link: "https://dev.to",
    tags: ["JavaScript", "Web Development", "Frontend"],
    popularity: 854,
    date: "2025-05-02",
    imageUrl: getImageUrl(2)
  },
  {
    id: 3,
    title: "Stack Overflow's Most Asked Questions",
    description: "Curious which programming questions are flooding SO this month? Take a look!",
    link: "https://stackoverflow.com/questions",
    tags: ["Stack Overflow", "Q&A", "Programming"],
    popularity: 723,
    date: "2025-05-01",
    imageUrl: getImageUrl(3)
  },
  {
    id: 4,
    title: "React 20 Release Candidate is Here",
    description: "The next major version of React brings significant performance improvements and new features.",
    link: "https://reactjs.org",
    tags: ["React", "JavaScript", "Frontend"],
    popularity: 1204,
    date: "2025-04-28",
    imageUrl: getImageUrl(4)
  },
  {
    id: 5,
    title: "Machine Learning Frameworks Comparison",
    description: "A detailed analysis of the top ML frameworks in 2025 with benchmark results.",
    link: "https://machinelearning.org",
    tags: ["Machine Learning", "AI", "Data Science"],
    popularity: 892,
    date: "2025-04-25",
    imageUrl: getImageUrl(5)
  },
  {
    id: 6,
    title: "Web Assembly Takes Over Backend Development",
    description: "How WASM is changing the landscape of server-side programming with near-native performance.",
    link: "https://webassembly.org",
    tags: ["WebAssembly", "Backend", "Performance"],
    popularity: 756,
    date: "2025-05-03",
    imageUrl: getImageUrl(6)
  },
  {
    id: 7,
    title: "TypeScript 6.0 Features Deep Dive",
    description: "Exploring the new type system improvements and developer experience enhancements.",
    link: "https://www.typescriptlang.org",
    tags: ["TypeScript", "JavaScript", "Development"],
    popularity: 845,
    date: "2025-04-22",
    imageUrl: getImageUrl(7)
  },
  {
    id: 8,
    title: "Quantum Computing for Software Developers",
    description: "A beginner-friendly introduction to quantum computing principles for traditional developers.",
    link: "https://quantum-computing.org",
    tags: ["Quantum Computing", "Future Tech", "Computing"],
    popularity: 634,
    date: "2025-04-20",
    imageUrl: getImageUrl(8)
  },
  {
    id: 9,
    title: "Sustainable Software Engineering Practices",
    description: "How to reduce the carbon footprint of your applications and write more efficient code.",
    link: "https://green-coding.org",
    tags: ["Green Coding", "Sustainability", "Best Practices"],
    popularity: 567,
    date: "2025-04-27",
    imageUrl: getImageUrl(9)
  },
  {
    id: 10,
    title: "The New Era of Browser APIs",
    description: "Exploring cutting-edge browser capabilities that are changing web development.",
    link: "https://developer.mozilla.org",
    tags: ["Web APIs", "Browsers", "Web Development"],
    popularity: 789,
    date: "2025-05-05",
    imageUrl: getImageUrl(10)
  },
  {
    id: 11,
    title: "Blockchain Development Simplified",
    description: "New tools making blockchain development accessible to mainstream developers.",
    link: "https://blockchain-dev.com",
    tags: ["Blockchain", "Web3", "Development"],
    popularity: 678,
    date: "2025-04-18",
    imageUrl: getImageUrl(11)
  },
  {
    id: 12,
    title: "Database Performance Optimization Guide",
    description: "Expert tips for squeezing maximum performance from your database systems.",
    link: "https://database-performance.tech",
    tags: ["Databases", "Performance", "Backend"],
    popularity: 765,
    date: "2025-04-15",
    imageUrl: getImageUrl(12)
  },
  {
    id: 13,
    title: "UI/UX Design Trends for Developers",
    description: "Design patterns and techniques every developer should know for creating better user experiences.",
    link: "https://uxtrends.design",
    tags: ["UI/UX", "Design", "Frontend"],
    popularity: 891,
    date: "2025-04-12",
    imageUrl: getImageUrl(13)
  },
  {
    id: 14,
    title: "Serverless Architecture Best Practices",
    description: "Learn how to design robust and scalable serverless applications with these proven patterns.",
    link: "https://serverless-handbook.dev",
    tags: ["Serverless", "Cloud", "Architecture"],
    popularity: 723,
    date: "2025-04-10",
    imageUrl: getImageUrl(14)
  },
  {
    id: 15,
    title: "DevOps Automation Techniques",
    description: "Streamline your development pipeline with these advanced automation strategies.",
    link: "https://devops-automation.com",
    tags: ["DevOps", "Automation", "CI/CD"],
    popularity: 812,
    date: "2025-05-06",
    imageUrl: getImageUrl(15)
  },
  {
    id: 16,
    title: "WebGPU: The Future of Browser Graphics",
    description: "How WebGPU is revolutionizing graphics performance in browser-based applications.",
    link: "https://webgpu-intro.dev",
    tags: ["WebGPU", "Graphics", "Web Development"],
    popularity: 645,
    date: "2025-04-08",
    imageUrl: getImageUrl(16)
  },
  {
    id: 17,
    title: "Microservices vs. Monoliths in 2025",
    description: "A fresh perspective on the age-old architecture debate with modern considerations.",
    link: "https://architecture-patterns.org",
    tags: ["Microservices", "Architecture", "Backend"],
    popularity: 734,
    date: "2025-04-05",
    imageUrl: getImageUrl(17)
  },
  {
    id: 18,
    title: "The State of CSS in 2025",
    description: "New CSS features and techniques that are transforming web design possibilities.",
    link: "https://css-tricks.com",
    tags: ["CSS", "Web Development", "Frontend"],
    popularity: 876,
    date: "2025-04-03",
    imageUrl: getImageUrl(18)
  },
  {
    id: 19,
    title: "AI-Assisted Coding Tools Comparison",
    description: "An in-depth look at how AI pair programmers are changing developer workflows.",
    link: "https://ai-coding.dev",
    tags: ["AI", "Development Tools", "Productivity"],
    popularity: 954,
    date: "2025-05-04",
    imageUrl: getImageUrl(19)
  },
  {
    id: 20,
    title: "Accessibility Guidelines for Modern Web Apps",
    description: "Comprehensive guide to building truly inclusive web applications in 2025.",
    link: "https://a11y-guidelines.web",
    tags: ["Accessibility", "Web Development", "UX"],
    popularity: 687,
    date: "2025-04-01",
    imageUrl: getImageUrl(20)
  }
];

const allTags = [...new Set(dummyNews.flatMap(news => news.tags))];

const NewsDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [hoveredNewsId, setHoveredNewsId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const itemsPerPage = viewMode === "grid" ? 9 : 5;
  const filtersRef = useRef<HTMLDivElement>(null);

  const filteredNews = dummyNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.some(tag => news.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.popularity - a.popularity;
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
  const paginatedNews = sortedNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, sortBy, viewMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setFiltersOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("date");
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const TagsList = () => (
    <div className="flex flex-wrap gap-2 mb-4 mt-2">
      {allTags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"}
          className={`cursor-pointer transition-all ${selectedTags.includes(tag)
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Badge>
      ))}
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
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => goToPage(pageNum)}
              className={currentPage === pageNum
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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

  const handleCardClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen h-full flex flex-col max-w-screen-xl mx-auto bg-transparent px-4 sm:px-6 md:px-8">
      <div className="top-0 z-20 pt-4 pb-3  mt-[15vh]">

        <div className="w-full max-w-screen px-4 md:px-12 py-10 bg-[rgba(15,23,42,0.6)] backdrop-blur-lg rounded-2xl mx-auto shadow-[0_0_30px_rgba(0,255,255,0.1)] relative overflow-hidden">
          <AuroraText className="text-4xl md:text-6xl text-white font-bold tracking-tight mb-4">
            ByteSpace
          </AuroraText>
          <h2 className="text-2xl md:text-4xl text-white font-semibold mb-2">
            Tech News
          </h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl">
            Stay updated with the latest in tech, coding, and digital trends. Fast, reliable, and always fresh — your daily dose of the future.
          </p>

          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.7)] rounded-full animate-pulse" />
        </div>



        <div className="flex flex-col md:flex-row justify-between gap-4 mt-4 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 bg-gray-800 border-gray-700 text-white w-full"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6 text-gray-400 hover:text-white"
                onClick={() => setSearchQuery("")}
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
                {selectedTags.length > 0 && (
                  <Badge className="ml-1 bg-indigo-600 text-white text-xs h-5 min-w-5 flex items-center justify-center p-0">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>

              <div className="flex bg-gray-800 rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-none ${viewMode === "list" ? "bg-indigo-600" : "bg-transparent text-gray-300"}`}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-none ${viewMode === "grid" ? "bg-indigo-600" : "bg-transparent text-gray-300"}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant={sortBy === "date" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("date")}
                className={sortBy === "date"
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }
              >
                <Calendar className="h-3.5 w-3.5 mr-1" /> Latest
              </Button>
              <Button
                variant={sortBy === "popularity" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("popularity")}
                className={sortBy === "popularity"
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }
              >
                <Heart className="h-3.5 w-3.5 mr-1" /> Popular
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
            <h3 className="text-white font-medium">Filter by Tags</h3>
            {selectedTags.length > 0 && (
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
          <TagsList />
        </div>
      )}

      <div className="text-sm text-gray-400 mt-4 mb-2 flex justify-between items-center">
        <span>Showing {paginatedNews.length} of {filteredNews.length} results</span>
        {favorites.length > 0 && (
          <Badge className="bg-indigo-600/70 text-white flex items-center gap-1">
            <BookmarkCheck className="h-3 w-3" /> {favorites.length} Saved
          </Badge>
        )}
      </div>

      {filteredNews.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Search className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-lg">No matching results found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
          <Button
            onClick={clearFilters}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700"
          >
            Clear all filters
          </Button>
        </div>
      )}

      {paginatedNews.length > 0 && (
        <div className={viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          : "flex flex-col gap-4 mt-6"
        }>
          {paginatedNews.map((news) => (
            <Card
              key={news.id}
              className={`relative bg-gray-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-indigo-500/50 cursor-pointer border-0 ${viewMode === "list" ? "flex" : "flex flex-col"
                }`}
              onMouseEnter={() => setHoveredNewsId(news.id)}
              onMouseLeave={() => setHoveredNewsId(null)}
              onClick={() => handleCardClick(news.link)}
            >
              <div
                className={`relative ${viewMode === "list"
                  ? "w-1/4 md:w-1/6 lg:w-1/5 min-w-24"
                  : "aspect-video w-full"
                  }`}
              >
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute bottom-2 right-2 h-8 w-8 rounded-full bg-gray-900/80 backdrop-blur-sm transition-opacity duration-200 ${hoveredNewsId === news.id || favorites.includes(news.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                  onClick={(e) => toggleFavorite(news.id, e)}
                  aria-label={favorites.includes(news.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorites.includes(news.id) ? (
                    <BookmarkCheck className="h-4 w-4 text-indigo-400" />
                  ) : (
                    <Bookmark className="h-4 w-4 text-white" />
                  )}
                </Button>
              </div>

              <div className={`relative z-10 p-4 flex flex-col ${viewMode === "list" ? "flex-1" : ""
                }`}>
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-medium text-lg mb-2">{news.title}</h3>
                </div>

                <p className="text-sm text-gray-300 mb-3 line-clamp-2">{news.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {news.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs bg-gray-800/70 text-gray-300 hover:bg-gray-700 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleTag(tag);
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-800/50">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-indigo-400" /> {news.date}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-3.5 w-3.5 mr-1.5 text-red-500" /> {news.popularity}
                    </span>
                  </div>
                  <span className="text-indigo-400 hover:text-indigo-300 hover:underline text-sm inline-flex items-center gap-1">
                    Read more →
                  </span>
                </div>
              </div>

              <ShineBorder
                className={`absolute inset-0 z-0 ${hoveredNewsId === news.id ? 'opacity-100' : 'opacity-50'}`}
                shineColor={["#8B5CF6", "#4F46E5", "#2563EB"]}
              />
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default NewsDashboard;