# SmartCricket Firestore Security Rules Snippet

These rules allow public read for `config/latestRelease` (used by the download website to fetch the latest APK release info), and public creation of anonymous download count entries in `downloads` with strict schema validation. No public reads, updates, or deletions are permitted on `downloads`.

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // 1. Config collection: public read for release information
    match /config/latestRelease {
      allow read: if true;
      allow write: if false; // Only developers via admin console
    }

    // 2. Downloads collection: public create for anonymous install analytics
    match /downloads/{downloadId} {
      // Allow creation only if the document contains exact required fields with valid types
      allow create: if request.resource.data.keys().hasOnly(['versionCode', 'createdAt', 'source', 'device'])
                    && request.resource.data.versionCode is int
                    && request.resource.data.createdAt is timestamp
                    && request.resource.data.source == 'web'
                    && request.resource.data.device in ['android', 'ios', 'desktop'];

      // Never allow public inspection, modification, or deletion of analytics
      allow read, update, delete: if false;
    }

    // Default rule for all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```
