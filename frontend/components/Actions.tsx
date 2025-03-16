"use server"

interface PersonResponse {
  username: string;
  email: string;
  password: string;
  token: string;
}

export async function ClientLogin(formData: FormData) {
  console.log(formData);
    const response = await fetch("http://localhost:8080/api/v1/auth/authenticate",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: formData.get("email"), password: formData.get("password")})
    });
    var text: PersonResponse = ({username: "", token: "", email: "", password: ""});
    if (response.ok) {
      text = await response.json();
      text.email = formData.get("email")?.toString() || "";
      text.password = formData.get("password")?.toString() || "";
      return text;
    } else {
      return null;
    }

    
}

export async function ClientRegister() {

}

export async function ClientLogout() {
    // await signOut();
    // redirect ("/");
}