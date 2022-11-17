import { UserManagerSettings } from 'oidc-client';

export type AppGitInfo = {
   commit: string;
   ref: string;
   timestamp: string;
};

export type AppSettings = {
   identityUrl: string;
   conferenceUrl: string;
   signalrHubUrl: string;
   equipmentSignalrHubUrl: string;
   frontendUrl: string;

   gitInfo: AppGitInfo;
};

// injected by ASP.Net Core, normalize urls. All urls don't have a trailing slash
const appSettings: AppSettings = Object.fromEntries(
   Object.entries((window as any).ENV).map(([name, value]) =>
      typeof value === 'string' ? [name, value.replace(/\/$/, '')] : [name, value],
   ),
) as AppSettings;

// const appSettings: AppSettings = {
//    identityUrl: "https://collaboidentity.goserp.co.uk/",
//    conferenceUrl: "https://conference.goserp.co.uk/",
//    signalrHubUrl: "https://conference.goserp.co.uk/signalr",
//    equipmentSignalrHubUrl: "https://conference.goserp.co.uk/equipment-signalr",
//    frontendUrl: "https://collabo.goserp.co.uk/",
//    gitInfo: {
//       ref: '',
//       commit: '',
//       timestamp: ''
//    }
// };

export default appSettings;

export const ocidConfig: UserManagerSettings = {
   client_id: 'spa',
   redirect_uri: `${appSettings.frontendUrl}/authentication/callback`,
   response_type: 'code',
   post_logout_redirect_uri: `${appSettings.frontendUrl}/`,
   scope: 'openid profile user.info',
   authority: appSettings.identityUrl,
   silent_redirect_uri: `${appSettings.frontendUrl}/authentication/silent_callback`,
   automaticSilentRenew: true,
   loadUserInfo: true,
};
