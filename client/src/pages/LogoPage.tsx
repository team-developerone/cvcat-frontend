import Layout from "@/components/Layout";
import LogoShowcase from "@/components/LogoShowcase";

export default function LogoPage() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Logo Design</h1>
          <p className="text-gray-600 mb-8">Flat, sleek, and minimal logo options for cvcat</p>
          
          <LogoShowcase />
        </div>
      </div>
    </Layout>
  );
}