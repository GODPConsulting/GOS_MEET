namespace WebSPA
{
    public class AppSettings
    {
        public string IdentityUrl { get; set; } = "https://collaboidentity.goserp.co.uk/";

        public string ConferenceUrl { get; set; } = "https://conference.goserp.co.uk/";

        public string SignalrHubUrl { get; set; } = "https://conference.goserp.co.uk/signalr";

        public string EquipmentSignalrHubUrl { get; set; } = "https://conference.goserp.co.uk/equipment-signalr";

        public string FrontendUrl { get; set; } = "https://collabo.goserp.co.uk/";

        public AppGitInfo GitInfo { get; set; } = new();
    }

    public class AppGitInfo
    {
        public string Commit { get; set; } = "unavailable";

        public string Ref { get; set; } = "unavailable";

        public string Timestamp { get; set; } = "unavailable";
    }
}
