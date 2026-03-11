'use client';

import { attackPathSteps } from '@/data/mockData';
import { useState } from 'react';

export default function AttackPathPage() {
  const [generated, setGenerated] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      {/* Page Title */}
      <div className="mb-8 border-b border-gray-200 pb-2">
        <h2 className="text-3xl font-medium text-black mb-2 tracking-tight">
          Attack Path Generator
        </h2>
        <div className="flex items-center gap-4 text-xs text-gray-400 italic mb-4">
          <span>From VulNexus Research Intelligence</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>Revised version 2.4.1</span>
        </div>
        <p className="text-sm leading-relaxed text-gray-600 max-w-4xl">
          The <span className="font-semibold">Attack Path Generator</span> is an AI-driven simulation tool
          designed to identify potential exploit chains within a target infrastructure. By leveraging
          large language models and real-time vulnerability intelligence, the tool correlates <span className="text-black underline cursor-pointer">reconnaissance data</span> such as open
          ports and service versions with known exploit vectors to model multi-stage infiltration
          scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-black border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <span>📊</span>
              Reconnaissance Data Input
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Open Ports & Protocols
                </label>
                <input
                  className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-white"
                  placeholder="e.g. 80/tcp, 443/tcp, 8080/tcp, 22/ssh"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Service Banners
                </label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-white"
                  placeholder="Paste Nmap banners or service headers..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Software Versions
                </label>
                <input
                  className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-white"
                  placeholder="e.g. Apache Struts 2.3.5, OpenSSH 7.2p2"
                  type="text"
                />
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setGenerated(true)}
                  className="w-full bg-white text-black font-semibold py-2.5 px-4 rounded transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>🚀</span>
                  Generate Attack Path
                </button>
              </div>
            </div>
          </section>

          <div className="p-4 border-l-4 border-black bg-gray-50 rounded-r">
            <h4 className="text-xs font-bold uppercase text-black mb-1">System Insight</h4>
            <p className="text-xs text-gray-500 italic">
              Paths are generated using the latest CVE definitions from the VulNexus Intelligence
              engine, updated 14 minutes ago.
            </p>
          </div>
        </div>

        {/* Right Column: Outputs */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
              <span>⟲</span>
              Generated Attack Path
            </h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 bg-white rounded hover:bg-gray-50">
                <span>⬇</span>
                Export Path
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 bg-white rounded hover:bg-gray-50">
                <span>🔖</span>
                Save
              </button>
            </div>
          </div>

          {/* Sequence Visualization */}
          <div className="space-y-6 relative ml-6">
            {generated ? (
              attackPathSteps.map((step) => (
                <div key={step.step} className="relative flex gap-6" style={{ position: 'relative' }}>
                  {step.step < attackPathSteps.length && (
                    <div 
                      className="absolute" 
                      style={{ 
                        left: '1.25rem', 
                        top: '2.5rem', 
                        bottom: '-1.5rem', 
                        width: '2px', 
                        backgroundColor: '#00000030',
                        zIndex: 0 
                      }} 
                    />
                  )}
                  <div className="z-10 mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-lg border-4 border-white">
                    <span className="text-white text-xs font-bold">{step.step}</span>
                  </div>
                  <div className="flex-1 bg-white border border-gray-200 rounded p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-black">{step.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${
                        step.severity === 'CRITICAL' ? 'bg-black' :
                        step.severity === 'HIGH' ? 'bg-gray-600' :
                        'bg-gray-400'
                      }`}>
                        {step.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 leading-snug">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-3">
                      {step.cve && (
                        <a className="text-xs text-black font-medium flex items-center gap-1 hover:underline" href="#">
                          {step.cve} <span>↗</span>
                        </a>
                      )}
                      {step.exploitDb && (
                        <a className="text-xs text-black font-medium flex items-center gap-1 hover:underline" href="#">
                          {step.exploitDb} <span>↗</span>
                        </a>
                      )}
                      {step.relatedTool && (
                        <a className="text-xs text-black font-medium flex items-center gap-1 hover:underline" href="#">
                          {step.relatedTool} <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center">
                <span className="text-4xl mb-4 block">⟲</span>
                <p className="text-gray-400">Enter reconnaissance data and click Generate to see attack paths</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 text-xs text-gray-400 flex flex-col md:flex-row gap-4 justify-between items-start italic">
        <div className="max-w-xl">
          This page was last edited on 24 May 2024, at 14:02 (UTC). Text is available under the VulNexus Proprietary Intelligence License.
        </div>
        <div className="flex gap-4">
          <a className="hover:text-black underline" href="#">Privacy Policy</a>
          <a className="hover:text-black underline" href="#">About VulNexus</a>
          <a className="hover:text-black underline" href="#">Disclaimers</a>
        </div>
      </footer>
    </div>
  );
}
