(function () {
  const params = new URLSearchParams(window.location.search);
  const ttclid = params.get("ttclid");
  if (ttclid) {
    localStorage.setItem("ttclid", ttclid);
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const orderBtn = document.querySelector(".custom-buy-button");

  if (!orderBtn) return;

  const metafields = window.productMetafields || {};
  const offerGroup = metafields.offer_group;
  const productId = metafields.product_id;
  const imageId = metafields.image_id;

  const groupUrls = {
    "group1": "https://www.bcdxmn8trk.com/5P6NRK/2KTQH2G/",
    "group2": "https://www.bcdxmn8trk.com/5P6NRK/2KSCL9T/",
    "group3": "https://www.bcdxmn8trk.com/5P6NRK/2KSCL9T/",
    "group4": "https://www.bcdxmn8trk.com/5P6NRK/2L3B1ZW/"
  };

  orderBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (!offerGroup || !groupUrls[offerGroup]) {
      alert("Tracking link not available for this product.");
      return;
    }

    const ttclid = localStorage.getItem("ttclid") || "";
    const sourceId = encodeURIComponent(`${productId}___${imageId}`);
    const finalUrl = `${groupUrls[offerGroup]}?source_id=${sourceId}&sub5=${ttclid}`;

    const popup = document.createElement("div");
    popup.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.6); display:flex; justify-content:center; align-items:center; z-index:9999;";
    popup.innerHTML = `
      <div style="background:#fff; padding:20px; max-width:420px; text-align:center; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.3); font-family:Arial;">
        <h3 style="margin-bottom:10px;">⚠️ EXCLUSIVE OFFER – 1 PRODUCT PER CUSTOMER</h3>
        <p style="margin-bottom:10px;">To ensure fair access, purchases are limited to <strong>1 PRODUCT PER CUSTOMER</strong>.</p>
        <p style="margin-bottom:20px;">Please note: you will be <strong>DIRECTED TO CHECKOUT</strong> to complete your order.</p>
        <button id="proceed-btn" style="margin:5px 10px; padding:10px 20px; background:#8b1f45; color:white; border:none; border-radius:5px; cursor:pointer;">PROCEED TO CHECKOUT</button>
        <button id="cancel-btn" style="margin:5px 10px; padding:10px 20px; background:#ccc; color:#000; border:none; border-radius:5px; cursor:pointer;">CHANGE PRODUCT</button>
      </div>
    `;
    document.body.appendChild(popup);

    popup.querySelector("#proceed-btn").addEventListener("click", () => {
      window.location.href = finalUrl;
    });

    popup.querySelector("#cancel-btn").addEventListener("click", () => {
      popup.remove();
    });
  });
});
