import { useState } from 'react';
import { motion } from 'motion/react';
import { UploadCloud, AlertOctagon } from 'lucide-react';

export const Diagnostic = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    if (!image) return;
    setLoading(true);
    // Mock API call to Vision model
    setTimeout(() => {
      setResult({
        crop_identified: 'Cotton',
        classification: 'Leaf Blight',
        confidence: 92,
        treatment_guidelines: 'Apply copper-based fungicides immediately. Ensure proper spacing for air circulation.'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <header>
        <h2 style={{ fontSize: '2rem' }}>Crop Diagnostic</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>Upload a leaf image to detect diseases.</p>
      </header>

      <div className="card">
        {!image ? (
          <label style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            height: '300px', border: '2px dashed var(--color-border)', borderRadius: 'var(--border-radius)',
            cursor: 'pointer', transition: 'all 0.2s'
          }}>
            <UploadCloud size={48} color="var(--color-text-secondary)" />
            <span style={{ marginTop: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>Click to upload leaf image</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <img src={image} alt="Crop Leaf" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: 'var(--border-radius)' }} />
            
            {!result && (
              <button className="btn" onClick={handleScan} disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Scanning...' : 'Diagnose Disease'}
              </button>
            )}
          </div>
        )}
      </div>

      {result && (
        <motion.div 
          className="card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ borderColor: 'var(--color-error)' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
            <AlertOctagon color="var(--color-error)" size={32} />
            <div>
              <h3 style={{ color: 'var(--color-error)' }}>{result.classification} detected</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                Identified: {result.crop_identified} ({result.confidence}% confidence)
              </p>
              
              <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', backgroundColor: '#FEEBEE', borderRadius: 'var(--border-radius)' }}>
                <h4 style={{ marginBottom: 'var(--space-2)' }}>Treatment Guidelines</h4>
                <p>{result.treatment_guidelines}</p>
              </div>

              <button className="btn-secondary" style={{ marginTop: 'var(--space-3)', width: '100%' }} onClick={() => {setImage(null); setResult(null)}}>
                Scan Another Leaf
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
