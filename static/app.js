const statusBox = document.getElementById("status");

function setStatus(message, type = "") {
  statusBox.textContent = message;
  statusBox.className = `status ${type}`.trim();
}

async function callApi(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}

document.getElementById("encrypt-btn").addEventListener("click", async () => {
  const message = document.getElementById("message").value;
  const password = document.getElementById("encrypt-password").value;

  try {
    const data = await callApi("/encrypt", { message, password });
    document.getElementById("ciphertext").value = data.ciphertext;
    document.getElementById("plaintext").value = "";
    setStatus("Message encrypted successfully.", "success");
  } catch (error) {
    setStatus(error.message, "error");
  }
});

document.getElementById("decrypt-btn").addEventListener("click", async () => {
  const ciphertext = document.getElementById("ciphertext").value;
  const password = document.getElementById("decrypt-password").value;

  try {
    const data = await callApi("/decrypt", { ciphertext, password });
    document.getElementById("plaintext").value = data.message;
    setStatus("Message decrypted successfully.", "success");
  } catch (error) {
    setStatus(error.message, "error");
  }
});
