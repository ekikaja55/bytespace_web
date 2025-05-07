import { useState, useEffect } from "react";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: string[];
  popularity: number;
  date: string;
}

type SortOption = "date" | "popularity";

const dummyNews: NewsItem[] = [
  {
    id: 1,
    title: "Top GitHub Repositories in 2025",
    description: "Explore the most starred repositories this year, from AI tools to full-stack boilerplates.",
    link: "https://github.com/trending",
    tags: ["GitHub", "Open Source", "Development"],
    popularity: 987,
    date: "2025-04-30"
  },
  {
    id: 2,
    title: "JavaScript Trends You Shouldn't Miss",
    description: "Check out what's hot in the JS ecosystem, including new ECMAScript proposals.",
    link: "https://dev.to",
    tags: ["JavaScript", "Web Development", "Frontend"],
    popularity: 854,
    date: "2025-05-02"
  },
  {
    id: 3,
    title: "Stack Overflow's Most Asked Questions",
    description: "Curious which programming questions are flooding SO this month? Take a look!",
    link: "https://stackoverflow.com/questions",
    tags: ["Stack Overflow", "Q&A", "Programming"],
    popularity: 723,
    date: "2025-05-01"
  },
  {
    id: 4,
    title: "React 20 Release Candidate is Here",
    description: "The next major version of React brings significant performance improvements and new features.",
    link: "https://reactjs.org",
    tags: ["React", "JavaScript", "Frontend"],
    popularity: 1204,
    date: "2025-04-28"
  },
  {
    id: 5,
    title: "Machine Learning Frameworks Comparison",
    description: "A detailed analysis of the top ML frameworks in 2025 with benchmark results.",
    link: "https://machinelearning.org",
    tags: ["Machine Learning", "AI", "Data Science"],
    popularity: 892,
    date: "2025-04-25"
  },
  {
    id: 6,
    title: "Web Assembly Takes Over Backend Development",
    description: "How WASM is changing the landscape of server-side programming with near-native performance.",
    link: "https://webassembly.org",
    tags: ["WebAssembly", "Backend", "Performance"],
    popularity: 756,
    date: "2025-05-03"
  },
  {
    id: 7,
    title: "TypeScript 6.0 Features Deep Dive",
    description: "Exploring the new type system improvements and developer experience enhancements.",
    link: "https://www.typescriptlang.org",
    tags: ["TypeScript", "JavaScript", "Development"],
    popularity: 845,
    date: "2025-04-22"
  },
  {
    id: 8,
    title: "Quantum Computing for Software Developers",
    description: "A beginner-friendly introduction to quantum computing principles for traditional developers.",
    link: "https://quantum-computing.org",
    tags: ["Quantum Computing", "Future Tech", "Computing"],
    popularity: 634,
    date: "2025-04-20"
  },
  {
    id: 9,
    title: "Sustainable Software Engineering Practices",
    description: "How to reduce the carbon footprint of your applications and write more efficient code.",
    link: "https://green-coding.org",
    tags: ["Green Coding", "Sustainability", "Best Practices"],
    popularity: 567,
    date: "2025-04-27"
  },
  {
    id: 10,
    title: "The New Era of Browser APIs",
    description: "Exploring cutting-edge browser capabilities that are changing web development.",
    link: "https://developer.mozilla.org",
    tags: ["Web APIs", "Browsers", "Web Development"],
    popularity: 789,
    date: "2025-05-05"
  },
  {
    id: 11,
    title: "Blockchain Development Simplified",
    description: "New tools making blockchain development accessible to mainstream developers.",
    link: "https://blockchain-dev.com",
    tags: ["Blockchain", "Web3", "Development"],
    popularity: 678,
    date: "2025-04-18"
  },
  {
    id: 12,
    title: "Database Performance Optimization Guide",
    description: "Expert tips for squeezing maximum performance from your database systems.",
    link: "https://database-performance.tech",
    tags: ["Databases", "Performance", "Backend"],
    popularity: 765,
    date: "2025-04-15"
  },
  {
    id: 13,
    title: "UI/UX Design Trends for Developers",
    description: "Design patterns and techniques every developer should know for creating better user experiences.",
    link: "https://uxtrends.design",
    tags: ["UI/UX", "Design", "Frontend"],
    popularity: 891,
    date: "2025-04-12"
  },
  {
    id: 14,
    title: "Serverless Architecture Best Practices",
    description: "Learn how to design robust and scalable serverless applications with these proven patterns.",
    link: "https://serverless-handbook.dev",
    tags: ["Serverless", "Cloud", "Architecture"],
    popularity: 723,
    date: "2025-04-10"
  },
  {
    id: 15,
    title: "DevOps Automation Techniques",
    description: "Streamline your development pipeline with these advanced automation strategies.",
    link: "https://devops-automation.com",
    tags: ["DevOps", "Automation", "CI/CD"],
    popularity: 812,
    date: "2025-05-06"
  },
  {
    id: 16,
    title: "WebGPU: The Future of Browser Graphics",
    description: "How WebGPU is revolutionizing graphics performance in browser-based applications.",
    link: "https://webgpu-intro.dev",
    tags: ["WebGPU", "Graphics", "Web Development"],
    popularity: 645,
    date: "2025-04-08"
  },
  {
    id: 17,
    title: "Microservices vs. Monoliths in 2025",
    description: "A fresh perspective on the age-old architecture debate with modern considerations.",
    link: "https://architecture-patterns.org",
    tags: ["Microservices", "Architecture", "Backend"],
    popularity: 734,
    date: "2025-04-05"
  },
  {
    id: 18,
    title: "The State of CSS in 2025",
    description: "New CSS features and techniques that are transforming web design possibilities.",
    link: "https://css-tricks.com",
    tags: ["CSS", "Web Development", "Frontend"],
    popularity: 876,
    date: "2025-04-03"
  },
  {
    id: 19,
    title: "AI-Assisted Coding Tools Comparison",
    description: "An in-depth look at how AI pair programmers are changing developer workflows.",
    link: "https://ai-coding.dev",
    tags: ["AI", "Development Tools", "Productivity"],
    popularity: 954,
    date: "2025-05-04"
  },
  {
    id: 20,
    title: "Accessibility Guidelines for Modern Web Apps",
    description: "Comprehensive guide to building truly inclusive web applications in 2025.",
    link: "https://a11y-guidelines.web",
    tags: ["Accessibility", "Web Development", "UX"],
    popularity: 687,
    date: "2025-04-01"
  }
];

const allTags: string[] = [...new Set(dummyNews.flatMap(news => news.tags))];

const NewsDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 5;

  const filteredNews: NewsItem[] = dummyNews.filter(news => {
    const matchesSearch: boolean = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          news.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags: boolean = selectedTags.length === 0 || 
                        selectedTags.some(tag => news.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const sortedNews: NewsItem[] = [...filteredNews].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.popularity - a.popularity;
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const totalPages: number = Math.ceil(sortedNews.length / itemsPerPage);
  const paginatedNews: NewsItem[] = sortedNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const toggleTag = (tag: string): void => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = (): void => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("date");
  };

  const goToPage = (page: number): void => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen h-full flex flex-col gap-6 p-4 md:p-6 bg-transparent">
      <h1 className="text-4xl text-white font-bold">Tech News</h1>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search news..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-8 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-300 text-sm">Sort by:</span>
          <Button
            variant={sortBy === "date" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("date")}
            className={sortBy === "date" ? "bg-indigo-600" : "bg-gray-800 text-gray-300"}
          >
            Latest
          </Button>
          <Button
            variant={sortBy === "popularity" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("popularity")}
            className={sortBy === "popularity" ? "bg-indigo-600" : "bg-gray-800 text-gray-300"}
          >
            Most Popular
          </Button>
          
          {(selectedTags.length > 0 || searchQuery) && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="ml-2 bg-gray-800 text-gray-300 flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Clear
            </Button>
          )}
        </div>
      </div>
      
      {/* Tags filter */}
      <div className="flex flex-wrap gap-2 mb-2">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className={`cursor-pointer ${
              selectedTags.includes(tag) ? "bg-indigo-600" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      
      {/* Results count */}
      <div className="text-sm text-gray-400">
        Showing {paginatedNews.length} of {filteredNews.length} results
      </div>
      
      {/* News cards */}
      <div className="space-y-6">
        {paginatedNews.length > 0 ? (
          paginatedNews.map((news) => (
            <Card key={news.id} className="relative w-full md:w-[60vw] bg-transparent overflow-hidden">
              <div className="relative z-10 p-6 space-y-2">
                <CardHeader className="p-0">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-xl">{news.title}</CardTitle>
                    <div className="text-sm text-gray-400 flex items-center gap-1">
                      <span>❤️ {news.popularity}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-gray-300">{news.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3 mb-3">
                    {news.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-800 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <a 
                      href={news.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-indigo-400 hover:text-indigo-300 underline text-sm inline-flex items-center gap-1"
                    >
                      Read more →
                    </a>
                    <span className="text-xs text-gray-400">{news.date}</span>
                  </div>
                </CardContent>
              </div>
              <ShineBorder
                className="absolute inset-0 z-0"
                shineColor={["#8B5CF6", "#EC4899", "#F59E0B"]}
              />
            </Card>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            No results found. Try adjusting your filters.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className={currentPage === page ? "bg-indigo-600" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
              >
                {page}
              </Button>
            ))}
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
      )}
    </div>
  );
};

export default NewsDashboard;