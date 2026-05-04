import { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "zh";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggle: () => {},
  t: (k) => k,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("lang") as Lang) || "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "zh" : "en"));

  const t = (key: string): string => {
    const map = translations[lang];
    return (map as Record<string, string>)[key] ?? translations["en"][key as keyof typeof translations.en] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

const translations = {
  en: {
    badge: "Beginner-friendly · No jargon required",
    heroTitle: "AI Research Skills",
    heroSubtitle: "Find the right AI tool for what you want to build — pick by goal, try in minutes, no jargon required.",
    heroJumpGoals: "Pick by goal",
    heroJumpQuick: "Try in minutes",
    heroJumpLibrary: "Browse all skills",
    navGoals: "Goals",
    navQuickStart: "Try Now",
    navLibrary: "Library",
    navPaths: "Paths",
    backToTop: "Back to top",
    searchPlaceholder: "Search for a skill, paper, or technique...",
    searchModalPlaceholder: "Search skills, categories, tags...",
    searchNoResults: "No results found.",
    searchSuggested: "Try one of these",
    searchRecent: "Recently viewed",
    searchFavorites: "Favorites",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    tocOnThisPage: "On this page",
    tocOverview: "Overview",
    tocInstall: "Install",
    tocDependencies: "Dependencies",
    tocRelated: "Related",
    statsSkills: "Skills",
    statsCategories: "Categories",
    statsOrchestrator: "Orchestrator",
    statsExperiments: "Experiments",
    sectionTitle: "The Library",
    footerText: "Built for the AI research community. No telemetry. No trackers.",
    skillsCount: "skills",
    home: "Home",
    dependencies: "Dependencies",
    metadata: "Metadata",
    version: "Version",
    author: "Author",
    license: "License",
    latest: "latest",
    community: "Community",
    viewGithub: "View Source on GitHub",
    readDocs: "Read Documentation",
    noDeps: "None required",
    docsComingSoon: "Documentation coming soon",
    viewSkill: "View skill",
    deps: "deps:",
    outline: "Skill Outline",
    whatItDoes: "What it does",
    howItWorks: "How it works",
    typicalWorkflow: "Typical workflow",
    quickInstall: "Quick Install",
    copy: "Copy",
    copied: "Copied!",
    relatedSkills: "Related Skills",
    prevSkill: "Previous Skill",
    nextSkill: "Next Skill",
    useCaseLabel: "Pick by Goal",
    useCaseTitle: "I want to…",
    useCaseSubtitle: "Don't know where to start? Tell us what you want to do — we'll point you to the right tools, no jargon required.",
    useCaseUseThese: "Use these together",
    quickStartLabel: "Try It Now",
    quickStartTitle: "Get Hands-On in Minutes",
    quickStartSubtitle: "These run on your laptop with one or two commands — no GPU cluster, no cloud account, no waiting.",
    quickStartCta: "Open the recipe",
    featuredLabel: "Editor's Picks",
    featuredTitle: "Start with These",
    pathsLabel: "Learning Paths",
    pathsTitle: "Curated Journeys",
    pathsSubtitle: "Hand-picked sequences of skills that take you from concept to mastery in a focused area.",
    stepsCount: "steps",
    startPath: "Start path",
    learningPath: "Learning Path",
    viewSourceLib: "Browse the Full Library on GitHub",
    filterByTag: "Filter by tag",
    clearFilters: "Clear filters",
    noSkillsMatching: "No skills match the selected tags.",
    footerTagline: "Built for the AI research community. No telemetry. No trackers.",
    footerBuiltBy: "for autonomous research",
  },
  zh: {
    badge: "新手友好 · 不用懂术语",
    heroTitle: "AI 研究技能库",
    heroSubtitle: "找到顺手的 AI 工具——按目标挑选、几分钟动手、不用懂术语。",
    heroJumpGoals: "按目标找",
    heroJumpQuick: "立即上手",
    heroJumpLibrary: "浏览全部",
    navGoals: "按目标",
    navQuickStart: "立即上手",
    navLibrary: "全部技能",
    navPaths: "学习路径",
    backToTop: "回到顶部",
    searchPlaceholder: "搜索技能、论文或技术方法...",
    searchModalPlaceholder: "搜索技能、类别、标签...",
    searchNoResults: "未找到结果。",
    searchSuggested: "试试这些热门",
    searchRecent: "最近看过",
    searchFavorites: "我的收藏",
    addToFavorites: "加入收藏",
    removeFromFavorites: "取消收藏",
    tocOnThisPage: "本页导航",
    tocOverview: "概览",
    tocInstall: "安装",
    tocDependencies: "依赖",
    tocRelated: "相关技能",
    statsSkills: "项技能",
    statsCategories: "个类别",
    statsOrchestrator: "编排器",
    statsExperiments: "次实验",
    sectionTitle: "技能库",
    footerText: "为 AI 研究社区而生。无遥测。无追踪器。",
    skillsCount: "项技能",
    home: "首页",
    dependencies: "依赖项",
    metadata: "元信息",
    version: "版本",
    author: "作者",
    license: "许可证",
    latest: "最新版",
    community: "社区",
    viewGithub: "在 GitHub 上查看源码",
    readDocs: "阅读文档",
    noDeps: "无需依赖",
    docsComingSoon: "文档即将推出",
    viewSkill: "查看技能",
    deps: "依赖：",
    outline: "技能概览",
    whatItDoes: "技能用途",
    howItWorks: "工作原理",
    typicalWorkflow: "典型流程",
    quickInstall: "快速安装",
    copy: "复制",
    copied: "已复制！",
    relatedSkills: "相关技能",
    prevSkill: "上一个技能",
    nextSkill: "下一个技能",
    useCaseLabel: "按目标找",
    useCaseTitle: "我想……",
    useCaseSubtitle: "不知道从哪开始？告诉我们你想做什么，我们直接指给你对应的工具，不用懂任何术语。",
    useCaseUseThese: "搭配使用",
    quickStartLabel: "立即上手",
    quickStartTitle: "5 分钟见效",
    quickStartSubtitle: "这几个在笔记本上一两条命令就跑起来——不用 GPU 集群、不用云账号、不用排队。",
    quickStartCta: "打开教程",
    featuredLabel: "编辑精选",
    featuredTitle: "从这些开始",
    pathsLabel: "学习路径",
    pathsTitle: "精选学习路线",
    pathsSubtitle: "精心编排的技能序列，带你从概念到精通，专注一个方向一路走到底。",
    stepsCount: "步",
    startPath: "开始学习",
    learningPath: "学习路径",
    viewSourceLib: "在 GitHub 上浏览完整技能库",
    filterByTag: "按标签筛选",
    clearFilters: "清除筛选",
    noSkillsMatching: "没有匹配所选标签的技能。",
    footerTagline: "为 AI 研究社区而生。无遥测。无追踪器。",
    footerBuiltBy: "为自主研究而生",
  },
} as const;
