"use client";

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export default function ApiTestPage() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const getDoc = trpc.getDocument.useQuery(undefined, { enabled: false });
  const saveDoc = trpc.saveDocument.useMutation();

  const generateRandomSnapshot = () => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    const shapes = ['rectangle', 'circle', 'triangle', 'line'];
    const randomShapeCount = Math.floor(Math.random() * 5) + 1;
    
    const randomShapes = Array.from({ length: randomShapeCount }, (_, i) => ({
      id: `shape_${Date.now()}_${i}`,
      type: shapes[Math.floor(Math.random() * shapes.length)],
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 400),
      width: Math.floor(Math.random() * 200) + 50,
      height: Math.floor(Math.random() * 150) + 30,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.floor(Math.random() * 360),
    }));

    return {
      shapes: randomShapes,
      records: [
        {
          id: `record_${Date.now()}`,
          type: "drawing_session",
          createdAt: new Date().toISOString(),
          randomId: Math.random().toString(36).substring(7),
        }
      ],
      metadata: {
        version: "1.0",
        createdBy: `User_${Math.floor(Math.random() * 1000)}`,
        totalShapes: randomShapes.length,
        sessionId: Math.random().toString(36).substring(7),
        lastModified: new Date().toISOString(),
        randomSeed: Math.random(),
      }
    };
  };

  const testGetDocument = async () => {
    setIsLoading(true);
    try {
      const res = await getDoc.refetch();
      const timestamp = new Date().toLocaleString();
      setResult(
        `✅ GET Document Success!\n` +
        `🕒 Timestamp: ${timestamp}\n` +
        `🔄 Request ID: ${Math.random().toString(36).substring(7)}\n\n` +
        `📊 Response Data:\n${JSON.stringify(res.data, null, 2)}`
      );
    } catch (error) {
      setResult(`❌ GET Document Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testSaveDocument = async () => {
    setIsLoading(true);
    try {
      const testSnapshot = generateRandomSnapshot();
      const res = await saveDoc.mutateAsync({ snapshot: testSnapshot });
      const timestamp = new Date().toLocaleString();
      
      setResult(
        `✅ SAVE Document Success!\n` +
        `🕒 Timestamp: ${timestamp}\n` +
        `🎲 Generated ${testSnapshot.shapes.length} random shapes\n` +
        `👤 User: ${testSnapshot.metadata.createdBy}\n` +
        `🔑 Session: ${testSnapshot.metadata.sessionId}\n\n` +
        `📤 Data Sent:\n${JSON.stringify(testSnapshot, null, 2)}\n\n` +
        `📥 Server Response:\n${JSON.stringify(res, null, 2)}`
      );
    } catch (error) {
      setResult(`❌ SAVE Document Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResult("");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">🧪 API Test Dashboard</h1>
        <p className="text-muted-foreground">
          Prueba los endpoints tRPC con datos dinámicos y random
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🎲 Test Endpoints</h2>
          
          <Button 
            onClick={testGetDocument} 
            variant="outline" 
            className="w-full justify-start"
            disabled={isLoading}
          >
            {isLoading ? "⏳ Fetching..." : "📥 GET Document"}
            <span className="ml-auto text-xs text-muted-foreground">
              /getDocument
            </span>
          </Button>

          <Button 
            onClick={testSaveDocument} 
            variant="outline" 
            className="w-full justify-start"
            disabled={isLoading}
          >
            {isLoading ? "⏳ Generating & Saving..." : "💾 SAVE Random Data"}
            <span className="ml-auto text-xs text-muted-foreground">
              /saveDocument
            </span>
          </Button>

          <Button 
            onClick={clearResults} 
            variant="secondary" 
            size="sm"
            className="w-full"
          >
            🗑️ Clear Results
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🔗 Navigation</h2>
          <div className="space-y-2">
            <Button asChild variant="default" className="w-full">
              <Link href="/editor">✏️ Go to Editor</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">🏠 Back to Home</Link>
            </Button>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <h3 className="font-semibold text-blue-900 mb-2">🎯 What happens:</h3>
            <ul className="text-blue-800 space-y-1">
              <li>• GET: Retrieves stored document</li>
              <li>• SAVE: Generates random shapes/data</li>
              <li>• Each click creates different data</li>
              <li>• Watch timestamps and IDs change!</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">📋 API Response</h2>
          {result && (
            <span className="text-sm text-muted-foreground">
              {result.includes('✅') ? '🟢 Success' : result.includes('❌') ? '🔴 Error' : '⚪ Ready'}
            </span>
          )}
        </div>
        <div className="bg-white border rounded p-3 min-h-[300px] max-h-[600px] overflow-auto">
          {result ? (
            <pre className="whitespace-pre-wrap text-sm text-gray-800">{result}</pre>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">🚀 Ready to test!</p>
              <p className="text-sm mt-2">Click buttons above to see random data generation</p>
              <p className="text-xs mt-1 text-gray-400">
                Each test generates unique timestamps, IDs, and random shapes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}