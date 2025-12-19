document.addEventListener("click", (e) => {
  if (e.target instanceof HTMLAnchorElement) {
    const link: HTMLAnchorElement | null = e.target.closest("a[href]");
    if (!link) return;

    const linkUrl = new URL(link.href, window.location.origin);
    const currentUrl = new URL(window.location.href);

    if (linkUrl.pathname === currentUrl.pathname && !linkUrl.hash) {
      e.preventDefault();
      return;
    }

    if (
      linkUrl.pathname === currentUrl.pathname &&
      linkUrl.hash &&
      linkUrl.hash !== currentUrl.hash
    ) {
      e.preventDefault();
      const targetId = linkUrl.hash.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", linkUrl.hash);
      }
    }
  }
});
