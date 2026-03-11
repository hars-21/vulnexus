import { pocSubmissionFields } from '@/data/mockData';

export default function POCPage() {
  return (
    <div className="px-8 py-8 lg:px-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <a className="hover:text-black" href="#">VULNEXUS</a>
        <span>›</span>
        <a className="hover:text-black" href="#">Submissions</a>
        <span>›</span>
        <span className="text-black font-medium">New POC</span>
      </nav>
      
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h2 className="text-3xl font-medium text-black">Submit Proof of Concept</h2>
        <p className="mt-2 text-gray-500 max-w-2xl">
          Create a new vulnerability research record. Please ensure all technical details are accurate and your exploit script is functional for verification.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Form Column */}
        <div className="xl:col-span-8 space-y-8">
          <form className="space-y-6">
            {/* CVE Autocomplete */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-black">Associated CVE Identifier</label>
              <div className="relative">
                <input
                  className="w-full p-2.5 text-sm bg-black border border-gray-600 rounded focus:ring-2 focus:ring-white/20 focus:border-white outline-none text-white placeholder:text-gray-500"
                  placeholder="e.g., CVE-2024-1234"
                  type="text"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                  <span className="text-[10px] bg-gray-700 px-1.5 py-0.5 rounded text-gray-300">AUTOCOMPLETE</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-500">Search for an existing CVE entry to link this POC.</p>
            </div>

            {/* Exploit Title */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-black">Exploit Title</label>
              <input
                className="w-full p-2.5 text-sm bg-black border border-gray-600 rounded focus:ring-2 focus:ring-white/20 focus:border-white outline-none text-white placeholder:text-gray-500"
                placeholder="Descriptive title of the vulnerability impact"
                type="text"
              />
            </div>

            {/* Description with Markdown Support */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-black">Detailed Description</label>
                <div className="flex gap-4">
                  <button className="text-[11px] text-black font-bold hover:underline" type="button">Write</button>
                  <button className="text-[11px] text-gray-500 hover:text-black" type="button">Preview</button>
                </div>
              </div>
              <div className="border border-gray-600 rounded overflow-hidden">
                <div className="bg-gray-800 border-b border-gray-600 px-3 py-1.5 flex gap-4">
                  <span className="text-lg text-gray-400 cursor-pointer hover:text-white">B</span>
                  <span className="text-lg text-gray-400 cursor-pointer hover:text-white italic">I</span>
                  <span className="text-lg text-gray-400 cursor-pointer hover:text-white">🔗</span>
                  <span className="text-lg text-gray-400 cursor-pointer hover:text-white">☰</span>
                  <span className="text-lg text-gray-400 cursor-pointer hover:text-white">{'</>'}</span>
                </div>
                <textarea
                  className="w-full p-3 text-sm bg-black border-none focus:ring-0 outline-none resize-y text-white placeholder:text-gray-500"
                  placeholder="Technical analysis, reproduction steps, and impact assessment..."
                  rows={8}
                />
              </div>
              <p className="text-[11px] text-gray-500 flex items-center gap-1">
                <span>ℹ</span> Supports Markdown for technical documentation.
              </p>
            </div>

            {/* Code Block */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-black">POC Script / Exploit Code</label>
                <select className="text-[11px] bg-gray-800 border-none rounded py-0.5 pl-2 pr-8 focus:ring-0 text-white">
                  {pocSubmissionFields.languages.map((lang) => (
                    <option key={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div className="relative group">
                <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm leading-relaxed min-h-[200px] border border-gray-700">
                  <code>{`import socket

# Template POC script
def exploit(target_ip, target_port):
    payload = b"A" * 1024
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((target_ip, target_port))
        s.sendall(payload)
        print("[+] Payload sent to {}:{}".format(target_ip, target_port))

if __name__ == "__main__":
    # Define parameters here
    pass`}</code>
                </pre>
                <button className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity" type="button">
                  📋
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 flex items-center justify-end gap-4">
              <button className="px-6 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors rounded" type="button">
                Cancel
              </button>
              <button className="px-8 py-2 text-sm font-bold bg-black text-white hover:bg-gray-800 transition-all rounded shadow-sm" type="submit">
                Initialize Submission
              </button>
            </div>
          </form>
        </div>

        {/* Right Sidebar */}
        <div className="xl:col-span-4 space-y-6">
          {/* Submission Guidelines */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <h4 className="text-xs font-bold uppercase text-gray-600">Submission Guidelines</h4>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex gap-3">
                <span className="text-black text-lg">✓</span>
                <div>
                  <h5 className="text-sm font-bold text-black">Verifiability</h5>
                  <p className="text-xs text-gray-500 mt-1 leading-normal">All POCs must be reproducible in the VulNexus Sandbox environment.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-black text-lg">✓</span>
                <div>
                  <h5 className="text-sm font-bold text-black">Original Content</h5>
                  <p className="text-xs text-gray-500 mt-1 leading-normal">Plagiarism is strictly prohibited. Cite external researchers if applicable.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-black text-lg">✓</span>
                <div>
                  <h5 className="text-sm font-bold text-black">Safety First</h5>
                  <p className="text-xs text-gray-500 mt-1 leading-normal">Do not include destructive components that could harm production systems.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Process */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <h4 className="text-xs font-bold uppercase text-gray-600">Verification Process</h4>
            </div>
            <div className="p-4">
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-200">
                {pocSubmissionFields.verificationSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className={`absolute -left-[21px] top-1 size-3 rounded-full border-2 border-white ${step.active ? 'bg-black' : 'bg-gray-400'}`} />
                    <p className={`text-[13px] font-semibold ${step.active ? 'text-black' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                    <p className="text-[11px] text-gray-500">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Researcher Stats Card */}
          <div className="bg-black border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-white text-xl">🏆</span>
              </div>
              <div>
                <p className="text-xs text-gray-400">Researcher Tier</p>
                <p className="text-sm font-bold text-white">Senior Contributor</p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[75%]" />
            </div>
            <p className="text-[10px] text-gray-400 mt-2">Submit 3 more POCs to reach 'Master' tier.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
