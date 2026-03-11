export interface CVE {
  id: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  score: number;
  software: string;
  versions: string;
  published: string;
  modified: string;
  platform: string;
  patchStatus: 'Patched' | 'Vulnerable' | 'Safe';
  exploitability: 'Public POC' | 'None' | 'Verified';
  references: string[];
}

export const cves: CVE[] = [
  {
    id: 'CVE-2024-21345',
    description: 'Microsoft Windows Kernel Elevation of Privilege Vulnerability',
    severity: 'CRITICAL',
    score: 9.8,
    software: 'Microsoft Windows Kernel',
    versions: '10, 11',
    published: '2 hours ago',
    modified: 'Just now',
    platform: 'Windows',
    patchStatus: 'Patched',
    exploitability: 'Public POC',
    references: ['Microsoft Security Advisory', 'NVD Entry']
  },
  {
    id: 'CVE-2024-1922',
    description: 'Google Chrome V8 Type Confusion in WebRTC',
    severity: 'HIGH',
    score: 7.5,
    software: 'Google Chrome',
    versions: '120.x - 122.x',
    published: '5 hours ago',
    modified: '1 hour ago',
    platform: 'Windows, macOS, Linux',
    patchStatus: 'Patched',
    exploitability: 'Public POC',
    references: ['Chrome Release Notes', 'NVD Entry']
  },
  {
    id: 'CVE-2024-5561',
    description: 'WordPress Core Authenticated Stored XSS',
    severity: 'MEDIUM',
    score: 5.4,
    software: 'WordPress Core',
    versions: '6.4.x',
    published: 'Yesterday',
    modified: '12 hours ago',
    platform: 'Web',
    patchStatus: 'Patched',
    exploitability: 'None',
    references: ['WordPress Blog', 'NVD Entry']
  },
  {
    id: 'CVE-2024-3321',
    description: 'OpenSSL TLS 1.3 Certificate Verification Bypass',
    severity: 'CRITICAL',
    score: 9.1,
    software: 'OpenSSL',
    versions: '3.0.1 - 3.0.13',
    published: 'Jan 12, 2024',
    modified: 'Jan 15, 2024',
    platform: 'Linux, Unix',
    patchStatus: 'Patched',
    exploitability: 'Verified',
    references: ['OpenSSL Security Advisory', 'NVD Entry']
  },
  {
    id: 'CVE-2023-50164',
    description: 'Apache Struts File Upload RCE via Path Traversal',
    severity: 'CRITICAL',
    score: 9.8,
    software: 'Apache Struts',
    versions: '2.0.0 - 2.3.37, 2.5.0 - 2.5.32, 6.0.0 - 6.3.0',
    published: 'Dec 7, 2023',
    modified: 'Jan 5, 2024',
    platform: 'Java',
    patchStatus: 'Patched',
    exploitability: 'Verified',
    references: ['Apache Security Advisory', 'NVD Entry']
  },
  {
    id: 'CVE-2021-44228',
    description: 'Apache Log4j2 JNDI Remote Code Execution (Log4Shell)',
    severity: 'CRITICAL',
    score: 10.0,
    software: 'Apache Log4j',
    versions: '2.0 - 2.14.1',
    published: 'Dec 10, 2021',
    modified: 'Dec 28, 2021',
    platform: 'Java',
    patchStatus: 'Patched',
    exploitability: 'Verified',
    references: ['NVD Entry', 'CISA Alert']
  },
  {
    id: 'CVE-2021-34527',
    description: 'Windows Print Spooler RCE (PrintNightmare)',
    severity: 'CRITICAL',
    score: 8.8,
    software: 'Windows Print Spooler',
    versions: 'Windows 10, Server 2019',
    published: 'Jun 29, 2021',
    modified: 'Jul 15, 2021',
    platform: 'Windows',
    patchStatus: 'Patched',
    exploitability: 'Verified',
    references: ['Microsoft Security Advisory']
  },
  {
    id: 'CVE-2023-46604',
    description: 'Apache ActiveMQ Deserialization RCE',
    severity: 'CRITICAL',
    score: 9.8,
    software: 'Apache ActiveMQ',
    versions: '5.0.0 - 5.18.3',
    published: 'Oct 10, 2023',
    modified: 'Nov 2, 2023',
    platform: 'Java',
    patchStatus: 'Patched',
    exploitability: 'Verified',
    references: ['Apache Security Advisory']
  }
];

export const exploits = [
  {
    id: 1,
    title: 'PoC for CVE-2023-46604 (ActiveMQ)',
    description: 'Python script for remote shell execution via OpenWire protocol.',
    language: 'Python',
    votes: 1424,
    forks: 243,
    author: 'user_zero',
    date: '2 days ago'
  },
  {
    id: 2,
    title: 'Exchange PowerShell Exploit Kit',
    description: 'Suite for auditing and exploiting misconfigured Exchange servers.',
    language: 'PowerShell',
    votes: 892,
    forks: 112,
    author: 'pentest_master',
    date: '1 week ago'
  },
  {
    id: 3,
    title: 'Log4j JNDI Injection Scanner',
    description: 'Multi-threaded scanner for Log4Shell vulnerable endpoints.',
    language: 'Python',
    votes: 756,
    forks: 89,
    author: 'bugbounty_hunter',
    date: '3 days ago'
  },
  {
    id: 4,
    title: 'Struts S2-062 Automated Exploiter',
    description: 'Automated exploitation tool for Apache Struts RCE vulnerabilities.',
    language: 'Python',
    votes: 634,
    forks: 67,
    author: 'redteam_ ops',
    date: '5 days ago'
  }
];

export const news = [
  {
    id: 1,
    title: 'New RaaS Group targeting Healthcare Infrastructure globally',
    source: 'CYBER NEWS',
    time: '45 MIN AGO',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    title: 'CISA adds 4 new vulnerabilities to Known Exploited Catalog',
    source: 'AGENCY UPDATE',
    time: '2 HOURS AGO',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    title: 'Ivanti releases emergency patches for critical VPN bypass',
    source: 'VULN ALERT',
    time: '5 HOURS AGO',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop'
  }
];

export const featuredThreats = [
  {
    id: 1,
    title: 'Log4Shell RCE (CVE-2021-44228)',
    description: 'A critical remote code execution vulnerability in Apache Log4j 2 allowing unauthenticated RCE.',
    severity: 'CRITICAL',
    date: 'Dec 10, 2021',
    views: '1.2M',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'SolarWinds Supply Chain Attack',
    description: 'An advanced persistent threat (APT) campaign targeting global IT supply chains through Orion software.',
    severity: 'CRITICAL',
    date: 'Dec 13, 2020',
    views: '850K',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'PrintNightmare (CVE-2021-34527)',
    description: 'Remote code execution vulnerability in the Windows Print Spooler service across all modern versions.',
    severity: 'CRITICAL',
    date: 'Jun 29, 2021',
    views: '420K',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=200&fit=crop'
  }
];

export const communityStats = {
  totalVulnerabilities: '245,392',
  activeContributors: '12,403',
  patchesValidated: '92%'
};

export const topContributors = [
  { id: 1, initials: 'JD', username: '@jdoe_security' },
  { id: 2, initials: 'HX', username: '@hex_zero' },
  { id: 3, initials: 'RS', username: '@root_shell' }
];

export const searchResults = [
  {
    type: 'CVE',
    id: 'CVE-2023-50164',
    severity: 'CRITICAL',
    score: 9.8,
    date: 'Dec 7, 2023',
    title: 'Apache Struts RCE: File Upload Vulnerability in Parameters Handling',
    description: 'An attacker can manipulate file upload parameters to enable path traversal and under some circumstances this can be used to upload a malicious file which can lead to Remote Code Execution (RCE).',
    hasExploit: true
  },
  {
    type: 'ARTICLE',
    date: 'Jan 15, 2024',
    source: 'Security Lab',
    title: 'Deep Dive: Understanding the Apache Struts OGNL Injection Chain',
    description: 'This technical analysis explores how Apache Struts handles Object-Graph Navigation Language (OGNL) expressions and why this component has historically been a frequent target for remote execution exploits.',
    readTime: '12 min'
  },
  {
    type: 'CVE',
    id: 'CVE-2021-31805',
    severity: 'HIGH',
    score: 8.1,
    date: 'Apr 12, 2022',
    title: 'S2-062: Apache Struts 2.0.0 through 2.5.29 Double Evaluation RCE',
    description: 'Forced double evaluation occurs when Apache Struts 2 tag attributes are evaluated twice based on certain user-controlled inputs.',
    hasExploit: false
  },
  {
    type: 'EXPLOIT',
    id: 'EXPLOIT-DB:51234',
    date: 'Nov 30, 2023',
    title: 'PoC: Python-based RCE for Apache Struts Multi-Part Request Parser',
    description: 'A functional Python script demonstrating the exploitation of CVE-2023-50164.',
    hasExploit: true,
    verified: true
  }
];

export const vulnerabilityFindings = [
  {
    id: 1,
    type: 'SQL Injection',
    severity: 'CRITICAL',
    confidence: 94,
    file: 'src/api/auth.js:142',
    reasoning: "User input from 'req.body.username' is directly concatenated into the SQL query without proper sanitization or parameterized inputs. Patterns match known unsanitized sink vulnerabilities.",
    related: ['CVE-2023-4451', 'CWE-89', 'OWASP-A03:2021']
  },
  {
    id: 2,
    type: 'Insecure Dependency',
    severity: 'MEDIUM',
    confidence: 78,
    file: 'package.json:28',
    reasoning: "Package 'lodash' version 4.17.20 contains multiple known vulnerabilities including Prototype Pollution. Update to 4.17.21 or higher.",
    related: ['CVE-2020-8203', 'CVE-2021-23337']
  },
  {
    id: 3,
    type: 'Potential Buffer Overflow',
    severity: 'LOW',
    confidence: 42,
    file: 'native/utils.c:84',
    reasoning: "Use of 'strcpy' detected. While the destination buffer size seems managed, 'strncpy' or 'strlcpy' is recommended for safer memory handling.",
    related: ['Best Practices', 'CWE-120']
  }
];

export const attackPathSteps = [
  {
    step: 1,
    title: 'Exploit Apache Struts RCE',
    severity: 'CRITICAL',
    cve: 'CVE-2017-5638',
    description: 'Exploitation of CVE-2017-5638 via a crafted Content-Type header allows remote code execution on the application server.',
    exploitDb: 'ExploitDB #41614'
  },
  {
    step: 2,
    title: 'Local Privilege Escalation',
    severity: 'HIGH',
    cve: 'CVE-2016-5195',
    description: "Utilization of dirty cow (CVE-2016-5195) to escalate from 'www-data' service account to 'root' access on the target host."
  },
  {
    step: 3,
    title: 'Internal Network Pivoting',
    severity: 'MEDIUM',
    description: 'Setup of an SSH dynamic port forward (SOCKS proxy) to bridge external traffic into the internal 10.0.x.x management subnet.',
    relatedTool: 'Lateral Movement Tooling'
  }
];

export const chatMessages = [
  {
    id: 1,
    role: 'user',
    content: "Analyze the attack surface for the recent Log4j vulnerability. I'm specifically looking for common bypasses used against early mitigation attempts."
  },
  {
    id: 2,
    role: 'assistant',
    content: `The initial mitigation for Log4Shell (CVE-2021-44228) focused on disabling lookup mechanism via system properties. However, several bypasses were discovered shortly after.`,
    relatedCve: {
      id: 'CVE-2021-45046',
      severity: 'CRITICAL',
      description: 'Incomplete fix in Log4j 2.15.0 leads to RCE in certain non-default configurations.'
    },
    code: '${jndi:ldap://127.0.0.1:1389/a}\n${${lower:j}ndi:rmi://127.0.0.1:1099/poc}'
  }
];

export const pocSubmissionFields = {
  languages: ['Python', 'Go', 'Bash', 'JavaScript', 'C++'],
  verificationSteps: [
    { title: 'Initial Review', description: 'Automated static analysis of the POC script for safety and syntax.', active: true },
    { title: 'Sandbox Execution', description: 'Manual verification by our triage team in an isolated environment.', active: false },
    { title: 'Final Validation', description: 'Public advisory generation and reward allocation (if applicable).', active: false }
  ]
};
