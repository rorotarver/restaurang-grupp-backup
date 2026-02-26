import AdminPanel from "../src/components/booking/AdminPanel";

export default function Admin() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">Admin Dashboard</h1>
                <AdminPanel />
            </div>
        </div>
    );
}