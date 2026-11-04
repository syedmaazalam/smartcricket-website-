import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  Send,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  ArrowLeft,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AdminBroadcastPage({ releaseData }) {
  const [versionName, setVersionName] = useState(releaseData?.versionName || '1.1');
  const [versionCode, setVersionCode] = useState((releaseData?.versionCode || 1) + 1);
  const [fileSize, setFileSize] = useState(releaseData?.fileSize || '4.85 MB');
  const [apkUrl, setApkUrl] = useState(
    releaseData?.apkUrl ||
      'https://github.com/syedmaazalam/cricket-scorer/releases/download/v1.0/SmartCricket.apk'
  );
  const [alertMessage, setAlertMessage] = useState(
    'Time to update SmartCricket! Install the latest build for enhanced match scorecards and faster live sync.'
  );
  const [notes, setNotes] = useState(
    'Real-time wagon wheels, faster over comparison, and MCC law updates.'
  );
  const [force, setForce] = useState(false);

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleBroadcast = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const payload = {
      versionCode: Number(versionCode),
      versionName: versionName.trim(),
      fileSize: fileSize.trim(),
      apkUrl: apkUrl.trim(),
      alertMessage: alertMessage.trim(),
      notes: notes.trim(),
      force: Boolean(force),
      releasedAt: new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    };

    try {
      if (db) {
        const releaseRef = doc(db, 'config', 'latestRelease');
        await setDoc(releaseRef, payload, { merge: true });
        setStatusMessage({
          type: 'success',
          text: `Update Broadcast Published! Version ${payload.versionName} is now live in Firestore.`,
        });
      } else {
        // Fallback for offline / demo mode
        localStorage.setItem('sc_local_release', JSON.stringify(payload));
        setStatusMessage({
          type: 'success',
          text: `Broadcast saved locally! (Firestore offline or unconfigured)`,
        });
      }
    } catch (err) {
      console.error('Failed to write release document:', err);
      setStatusMessage({
        type: 'error',
        text: `Error publishing broadcast: ${err.message}. If Firestore rules are locked, update config/latestRelease in Firebase Console.`,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 duration-200" />
          <span>Back to SmartCricket</span>
        </Link>
        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-mono text-xs font-bold">
          Manager Portal
        </span>
      </div>

      <div className="bg-card rounded-3xl border border-border p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 text-accent">
            <Bell className="w-6 h-6" />
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              App Update Broadcast System
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted">
            Send an update notification to all mobile app users and website visitors.
          </p>
        </div>

        {statusMessage && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm flex items-start gap-3 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <p className="leading-relaxed">{statusMessage.text}</p>
          </div>
        )}

        <form onSubmit={handleBroadcast} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">
                Version Name
              </label>
              <input
                type="text"
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                placeholder="1.1"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-ink text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">
                Version Code
              </label>
              <input
                type="number"
                value={versionCode}
                onChange={(e) => setVersionCode(e.target.value)}
                placeholder="2"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-ink text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">
                File Size
              </label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="4.4 MB"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-ink text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">
              Direct APK Download URL
            </label>
            <input
              type="url"
              value={apkUrl}
              onChange={(e) => setApkUrl(e.target.value)}
              placeholder="https://..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-ink text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">
              Update Notification Alert Message
            </label>
            <textarea
              rows={2}
              value={alertMessage}
              onChange={(e) => setAlertMessage(e.target.value)}
              placeholder="Message shown to users when app is opened..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-ink text-sm focus:outline-none focus:ring-2 focus:ring-accent leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">
              Changelog & Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's new in this release..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-ink text-sm focus:outline-none focus:ring-2 focus:ring-accent leading-relaxed"
            />
          </div>

          {/* Mandatory Force Switch */}
          <div className="p-4 rounded-2xl bg-surface/30 border border-border flex items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-xs text-ink block">
                Mandatory / Force Update
              </span>
              <span className="text-[11px] text-muted block">
                If checked, users cannot dismiss the notification until they update.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={force}
                onChange={(e) => setForce(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
            </label>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-accent text-white font-bold text-sm shadow-md hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Publishing to Firestore...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Broadcast Update Notification</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
