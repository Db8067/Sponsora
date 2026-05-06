import { Search, Filter, CheckCircle, XCircle, Eye, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Organizers | AdminOS",
};

export default function AdminOrganizersPage() {
  const organizers = [
    { id: 1, name: "Tech Nexus Foundation", contact: "contact@technexus.org", status: "Pending", requestedAt: "2 hours ago", plan: "Pro" },
    { id: 2, name: "Design Community IN", contact: "hello@designin.com", status: "Approved", requestedAt: "2 days ago", plan: "Starter" },
    { id: 3, name: "Crypto India", contact: "events@cryptoindia.io", status: "Rejected", requestedAt: "1 week ago", plan: "Free" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Organizers</h1>
          <p className="text-foreground/70 mt-1">Manage and approve event organizers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 border-l-4 border-l-orange-500">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-foreground/60 font-medium">Pending Approvals</p>
            <p className="text-2xl font-bold text-foreground">1</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 border-l-4 border-l-green-500">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-foreground/60 font-medium">Approved Organizers</p>
            <p className="text-2xl font-bold text-foreground">124</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search organizers..." 
              className="w-full bg-gray-50 dark:bg-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-gray-500 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
              <Filter className="w-4 h-4" /> Filter Status
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-slate-800/50 text-foreground/60">
              <tr>
                <th className="px-6 py-3 font-medium">Organization Name</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Plan</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Requested</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {organizers.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {org.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-foreground">{org.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground/70">{org.contact}</td>
                  <td className="px-6 py-4 text-foreground/70">{org.plan}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      org.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                      org.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {org.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground/70">{org.requestedAt}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 text-foreground/50">
                      <button className="p-1.5 hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="View Details"><Eye className="w-4 h-4" /></button>
                      {org.status === 'Pending' && (
                        <>
                          <button className="p-1.5 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                          <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Reject"><XCircle className="w-4 h-4" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
