// Live preview panes for the Decap CMS editor, styled to match the actual
// site (navy/gold palette, serif headings) instead of the generic default.
// Must load after decap-cms.js and before it finishes initializing.

var typeLabels = {
  davening: "Davening",
  class: "Learning / Class",
  community: "Community",
  holiday: "Holiday",
};

var typeColors = {
  davening: { bg: "#d6e2ee", color: "#16294a" },
  class: { bg: "#f5ead0", color: "#9a7124" },
  community: { bg: "#d1fae5", color: "#065f46" },
  holiday: { bg: "#fecdd3", color: "#9f1239" },
};

var EventPreview = createClass({
  render: function () {
    var data = this.props.entry.get("data");
    var title = data.get("title") || "Untitled event";
    var dateStr = data.get("date");
    var type = data.get("type") || "community";
    var location = data.get("location");
    var description = data.get("description");
    var image = data.get("image");

    var d = dateStr ? new Date(dateStr) : null;
    var month = d
      ? d.toLocaleDateString("en-US", { month: "short", timeZone: "America/New_York" })
      : "—";
    var day = d
      ? d.toLocaleDateString("en-US", { day: "numeric", timeZone: "America/New_York" })
      : "";
    var time = d
      ? d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" })
      : "";
    var colors = typeColors[type] || typeColors.community;
    var meta = [time, location].filter(Boolean).join(" · ");

    return h(
      "div",
      { className: "bi-preview" },
      image &&
        h("img", {
          className: "bi-hero",
          src: this.props.getAsset(image).toString(),
        }),
      h(
        "div",
        { className: "bi-card" },
        h(
          "div",
          { className: "bi-datebox" },
          h("span", { className: "bi-month" }, month),
          h("span", { className: "bi-day" }, day)
        ),
        h(
          "div",
          null,
          h(
            "span",
            { className: "bi-badge", style: { background: colors.bg, color: colors.color } },
            typeLabels[type] || "Community"
          ),
          h("h3", { className: "bi-title" }, title),
          meta && h("p", { className: "bi-meta" }, meta),
          description && h("p", { className: "bi-desc" }, description)
        )
      ),
      h("div", { className: "bi-body" }, this.props.widgetFor("body"))
    );
  },
});

var AnnouncementPreview = createClass({
  render: function () {
    var data = this.props.entry.get("data");
    var title = data.get("title") || "This Week at B'nai Israel";
    var weekOf = data.get("weekOf");

    return h(
      "div",
      { className: "bi-preview" },
      h(
        "div",
        { className: "bi-announcement" },
        weekOf && h("p", { className: "bi-eyebrow" }, "Week of " + weekOf),
        h("h2", { className: "bi-ann-title" }, title),
        h("div", { className: "prose-announcement" }, this.props.widgetFor("body"))
      )
    );
  },
});

CMS.registerPreviewTemplate("events", EventPreview);
CMS.registerPreviewTemplate("announcements", AnnouncementPreview);

CMS.registerPreviewStyle(
  "https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;700&family=Inter:wght@400;500;600&display=swap"
);

CMS.registerPreviewStyle(
  [
    "body { background: #faf6ef; color: #24303c; font-family: 'Inter', system-ui, sans-serif; margin: 0; padding: 1.5rem; }",
    ".bi-preview { max-width: 640px; margin: 0 auto; }",
    ".bi-hero { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 0.75rem; margin-bottom: 1rem; }",
    ".bi-card { display: flex; gap: 1rem; border-radius: 0.75rem; border: 1px solid #f3ecdf; background: #fff; padding: 1rem; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }",
    ".bi-datebox { flex-shrink: 0; width: 64px; height: 64px; border-radius: 0.5rem; background: #1d3557; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; }",
    ".bi-month { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #d4a94e; }",
    ".bi-day { font-family: 'Frank Ruhl Libre', Georgia, serif; font-size: 1.5rem; font-weight: 700; line-height: 1; }",
    ".bi-badge { display: inline-block; border-radius: 9999px; padding: 0.1rem 0.6rem; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.25rem; }",
    ".bi-title { font-family: 'Frank Ruhl Libre', Georgia, serif; font-size: 1.15rem; font-weight: 700; color: #16294a; margin: 0 0 0.25rem; }",
    ".bi-meta { font-size: 0.875rem; color: rgba(36,48,60,0.7); margin: 0; }",
    ".bi-desc { font-size: 0.875rem; margin: 0.35rem 0 0; }",
    ".bi-body { margin-top: 1.25rem; line-height: 1.7; }",
    ".bi-announcement { border-radius: 0.75rem; border: 1px solid #f3ecdf; background: #fff; padding: 1.5rem; }",
    ".bi-eyebrow { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9a7124; margin: 0 0 0.25rem; }",
    ".bi-ann-title { font-family: 'Frank Ruhl Libre', Georgia, serif; font-size: 1.5rem; font-weight: 700; color: #16294a; margin: 0 0 1rem; }",
    ".prose-announcement h2 { font-size: 1.1rem; font-weight: 700; color: #1d3557; margin: 1.25rem 0 0.4rem; }",
    ".prose-announcement h3 { font-size: 1rem; font-weight: 600; color: #1d3557; margin: 1rem 0 0.4rem; }",
    ".prose-announcement p { margin-bottom: 0.6rem; }",
    ".prose-announcement ul { padding-inline-start: 1.25rem; margin-bottom: 0.6rem; }",
    ".prose-announcement strong { color: #16294a; }",
  ].join("\n"),
  { raw: true }
);
