# SmartCricket In-App Update Notification Integration

This document outlines how the **SmartCricket mobile app (Flutter / Android)** listens to the update system and displays the update dialog when you broadcast an update.

---

## 1. Firestore Data Structure
The broadcast tool publishes to:
- **Collection**: `config`
- **Document**: `latestRelease`

```json
{
  "versionCode": 2,
  "versionName": "1.1",
  "fileSize": "4.4 MB",
  "apkUrl": "https://drive.usercontent.google.com/download?id=1ddi2Wws_dbTjswFrdqB2DK6FgzpB1341&export=download&confirm=t",
  "alertMessage": "Time to update SmartCricket! Install the latest build for enhanced match scorecards.",
  "notes": "Real-time wagon wheels and bug fixes.",
  "force": false,
  "releasedAt": "November 2026"
}
```

---

## 2. Flutter / Dart Implementation Snippet

Add this check inside your app startup logic (e.g. `main.dart` or `SplashScreen`):

```dart
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:url_launcher/url_launcher.dart';

Future<void> checkForUpdates(BuildContext context) async {
  try {
    // 1. Get current installed app version code
    final packageInfo = await PackageInfo.fromPlatform();
    final int currentVersionCode = int.tryParse(packageInfo.buildNumber) ?? 1;

    // 2. Fetch latest release from Firestore config
    final doc = await FirebaseFirestore.instance
        .collection('config')
        .doc('latestRelease')
        .get();

    if (!doc.exists) return;

    final data = doc.data()!;
    final int latestVersionCode = data['versionCode'] ?? 1;
    final String versionName = data['versionName'] ?? '1.0';
    final String alertMessage = data['alertMessage'] ?? 'A new update is available!';
    final String apkUrl = data['apkUrl'] ?? '';
    final bool isForce = data['force'] ?? false;

    // 3. If a newer version is available, display update dialog
    if (latestVersionCode > currentVersionCode && context.mounted) {
      showDialog(
        context: context,
        barrierDismissible: !isForce,
        builder: (ctx) => WillPopScope(
          onWillPop: () async => !isForce,
          child: AlertDialog(
            title: Text('Update Available (v$versionName)'),
            content: Text(alertMessage),
            actions: [
              if (!isForce)
                TextButton(
                  onPressed: () => Navigator.pop(ctx),
                  child: const Text('Later'),
                ),
              ElevatedButton(
                onPressed: () async {
                  final uri = Uri.parse(apkUrl);
                  if (await canLaunchUrl(uri)) {
                    await launchUrl(uri, mode: LaunchMode.externalApplication);
                  }
                },
                child: const Text('Update Now'),
              ),
            ],
          ),
        ),
      );
    }
  } catch (e) {
    debugPrint('Update check failed: $e');
  }
}
```

---

## 3. How to Broadcast an Update:
1. Go to `https://smartcricket-website.web.app/admin/broadcast`
2. Enter the new version info and custom notification message.
3. Click **"Broadcast Update Notification"**.
4. Both web visitors and mobile app users will immediately receive the update notification prompt!
