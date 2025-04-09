import Layout from "@/components/Layout";
import LogoExamples from "@/components/LogoExamples";

export default function LogoExamplesPage() {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Logo Design Concepts</h1>
          <p className="text-gray-600 mb-8">Flat, sleek, and minimal logo options for cvcat</p>
          
          <LogoExamples />
          
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Design Principles</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Flat design:</strong> No gradients, shadows, or 3D effects</li>
              <li><strong>Minimal:</strong> Reduced to essential elements only</li>
              <li><strong>Geometric:</strong> Based on simple shapes and clean lines</li>
              <li><strong>Color scheme:</strong> Gold primary (#DAA520), black secondary, white accent</li>
              <li><strong>Typography:</strong> Clean sans-serif with weight contrast between "cv" and "cat"</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}