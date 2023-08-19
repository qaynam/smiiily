import { isAppleDevice } from "./utils";

export async function requestClipboardPermission(type: "read" | "write"): Promise<boolean> {
  if (isAppleDevice()) {
    return true;
  }

  const queryOpts = { name: "clipboard-" + type, allowWithoutGesture: true };
  const readResult = await navigator.permissions.query(queryOpts as PermissionDescriptor);

  await new Promise((resolve) => {
    readResult.onchange = async () => {
      if (readResult.state === "granted") {
        return resolve(true);
      }
      return resolve(false);
    };

    if (readResult.state !== "granted") {
      if (type === "write") {
        navigator.clipboard.writeText(" ");
      } else {
        navigator.clipboard.readText();
      }
    }
  });

  return readResult.state === "granted";
}

export async function requestNotificationPermission(): Promise<boolean> {
  const queryOpts = { name: "notifications", allowWithoutGesture: false };
  const result = await navigator.permissions.query(queryOpts as PermissionDescriptor);

  return result.state === "granted";
}
