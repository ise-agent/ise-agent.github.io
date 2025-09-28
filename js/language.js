// 语言文本映射
const translations = {
  en: {
    //  网页稳定区域
    'hero-desc': 'Explore the practical achievements of AI Agents in full-process software development, and witness how intelligent tools reshape the efficiency boundaries of requirement development, testing, debugging, and maintenance',
    
    'flow-title': 'Full-Process Software Development Support Tools',
    'flow-desc': 'Intelligent Agent-driven complete software development lifecycle solutions',
    'step1-title': 'Software Requirement Development and Code Generation',
    'step1-desc': 'Intelligently analyze user requirements and automatically generate high-quality code to improve development efficiency',
    'step2-title': 'Software Testing and Debugging',
    'step2-desc': 'Automated test case generation, intelligent error detection and repair suggestions',
    'step3-title': 'Software Evolution and Maintenance',
    'step3-desc': 'Continuously monitor system performance, intelligent optimization and iteration suggestions',
    'flow-bottom-desc': 'Our intelligent agents provide intelligent support for the entire software development process through deep learning and natural language processing technologies, significantly improving development efficiency and software quality.',
    'results-title': 'Intelligent Agent Achievement Display',
    'results-desc': 'Focusing on the entire software development process, demonstrating the practical application results of AI Agents in requirement analysis, code generation, test optimization and system maintenance',
    'view-details': 'View Details',
    'video-title': 'Demo Video',
      //  动态变化区域，以agent命名 {agent_anme,agent_description,agent_tag}
      // testagent
      'testagent-name': 'Unit Testing Intelligent Agent',
      'testagent-desc': 'The Unit Testing Intelligent Agent is a unit test generation agent supported by knowledge graphs. It aims to address issues in traditional and existing test generation methods such as inaccurate context information extraction, lack of defect detection mechanisms, and coarse-grained task flows. It realizes automated generation of high-quality unit test cases through multi-agent collaboration.',
      'testagent-tag-1': 'Java Environment Comprehensive Mutation Score ~84%',
      'testagent-tag-2': 'Defect Detection Precision Rate up to 92%',
      'testagent-tag-3': 'Python Line/Branch Coverage Increased by 27%/51%',

      // fixagent
      'fix-agent-name': 'Software Fix Intelligent Agent',
      'fix-agent-desc': 'The Software Fix Intelligent Agent is an advanced multi-agent problem repair system. Based on Neo4j knowledge graph, dedicated AI agents, and intelligent patch generation technology, it enables automatic localization, analysis, and repair of software issues.',
      'fix-agent-tag-1': 'SWE-bench Lite Success Rate 51.33%',
      'fix-agent-tag-2': 'SWE-bench Lite Ranking #4',
      'fix-agent-tag-3': 'Maximum Issue Localization Count: 5',

      // reproductiontestagent
      'reproduction-test-agent-name': 'Reproduction Testing Intelligent Agent',
      'reproduction-test-agent-desc': 'The Reproduction Testing Intelligent Agent is a multi-agent workflow based on knowledge graphs and various shell tools. It is a reproduction test generation agent integrating suspicious code localization, root cause analysis, test prompting, and iterative feedback, achieving a 55% (166/300) fail-to-pass rate on SWE-bench Lite.',
      'reproduction-test-agent-tag-1': 'SWE-bench Lite reproduction rate: 55%'
    //  ...........
  },
  zh: {
    'hero-desc': '探索AI Agent在全流程软件开发中的实践成果，见证智能工具如何重塑需求开发、测试调试与维护的效率边界',
    'flow-title': '全流程软件开发支撑工具',
    'flow-desc': '智能Agent驱动的完整软件开发生命周期解决方案',
    'step1-title': '软件需求开发和代码生成',
    'step1-desc': '智能分析用户需求，自动生成高质量代码，提升开发效率',
    'step2-title': '软件测试与调试',
    'step2-desc': '自动化测试用例生成，智能错误检测与修复建议',
    'step3-title': '软件演化和维护',
    'step3-desc': '持续监控系统性能，智能优化与迭代建议',
    'flow-bottom-desc': '我们的智能Agent通过深度学习与自然语言处理技术，为软件开发全流程提供智能化支持，显著提升开发效率与软件质量。',
    'results-title': '智能Agent成果展示',
    'results-desc': '聚焦软件开发全流程，展示AI Agent在需求分析、代码生成、测试优化与系统维护中的实际应用成果',
    'view-details': '查看详情',
    'video-title': '演示视频',
    //  动态变化区域，以agent命名 {agent_anme,agent_description,agent_tag}

    // testagent
    'testagent-name': '单元测试智能体',
    'testagent-desc': '单元测试智能体以知识图谱为核心支撑的单元测试生成智能体，旨在解决传统及现有测试生成方法中上下文信息提取不准确、缺陷检测机制缺失、任务流程粗粒度等问题，通过多智能体协作实现高质量单元测试用例的自动化生成。',
    'testagent-tag-1': 'Java 环境综合变异分数约 84%',
    'testagent-tag-2': '缺陷检测精确率达 92%',
    'testagent-tag-3': 'Python行/分支覆盖提升 27%/51%',

    // fixagent
    'repairagent-name': '软件修复智能体',
    'repairagent-desc': '软件修复智能体是一款先进的多智能体问题修复系统，基于 Neo4j 知识图谱、专用 AI 智能体和智能补丁生成技术，实现软件问题的自动定位、分析与修复。',
    'repairagent-tag-1': 'SWE-bench Lite 成功率 51.33%',
    'repairagent-tag-2': 'SWE-bench Lite 排名 #4',
    'repairagent-tag-3': '最大问题定位数量 5 个',

    // reproductiontestagent
    'reproduction-test-agent-name': '复现测试智能体',
    'reproduction-test-agent-desc': '复现测试智能体是基于知识图谱和多种 shell 工具的多 Agent 工作流，是一个结合可疑代码定位、根因分析、测试提示和迭代反馈的复现测试生成 Agent，在 swebench-lite 上实现了 55%（166/300）的 fail-to-pass 率。',
    'reproduction-test-agent-tag-1': 'swebench-lite 复现率 55%'
    // ...............

    
  }
};

// 初始化语言
let currentLang = 'en';

// 切换语言函数
function toggleLanguage() {
  currentLang = (currentLang === 'zh' ? 'en' : 'zh');

// 修复后的语言切换按钮文本控制
document.querySelector('.zh').classList.toggle('hidden', currentLang !== 'zh');
document.querySelector('.en').classList.toggle('hidden', currentLang !== 'en');
  
  // 更新所有带data-i18n属性的元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  

  
  // 保存当前语言到本地存储
  localStorage.setItem('preferredLang', currentLang);
}

// 添加语言切换事件监听
document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);

// 页面加载时初始化语言
window.addEventListener('load', () => {
  const savedLang = localStorage.getItem('preferredLang');
  
  // 强制初始化一次文本内容
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  
  // 如果有保存的语言偏好且不同，则切换
  if (savedLang && savedLang !== currentLang) {
    toggleLanguage();
  }
});