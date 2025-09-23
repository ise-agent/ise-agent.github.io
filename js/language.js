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
    'testagent-name': 'Automated Testing Agent',
    'testagent-desc': 'An AI and automation-based testing assistant system that can automatically execute test cases, identify software defects, generate detailed test reports, effectively reduce testing costs and improve software quality.',
    'testagent-tag-1': 'Test Report Generation',
    'testagent-tag-2': 'Defect Detection',
    'testagent-tag-3': 'Automated Testing'
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
    'testagent-name': '自动化测试智能体',
    'testagent-desc': '基于人工智能与自动化技术的测试辅助系统，可自动执行测试用例、识别软件缺陷、生成详细测试报告，有效降低测试成本并提升软件质量。',
    'testagent-tag-1': '测试报告生成',
    'testagent-tag-2': '缺陷检测',
    'testagent-tag-3': '自动化测试'
    // ...............

    
  }
};

// 初始化语言
let currentLang = 'zh';

// 切换语言函数
function toggleLanguage() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  
  // 更新所有带data-i18n属性的元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  
  // 更新语言切换按钮文本
  document.querySelector('.zh').classList.toggle('hidden', currentLang === 'zh');
  document.querySelector('.en').classList.toggle('hidden', currentLang === 'en');
  
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