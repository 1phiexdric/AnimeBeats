<script lang="ts">
  import { userStore } from "$lib/store/userStore";
  // svelte/sveltekit
  import { fade } from "svelte/transition";
  import { enhance, applyAction } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import type { SubmitFunction } from "@sveltejs/kit";

  import * as z from "zod";
  let { form } = $props();

  let isLogin = $state(true);
  let showPassword = $state(false);
  let password: any = $state("");
  function toggleForm() {
    isLogin = !isLogin;
  }
  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
  const handleLog: SubmitFunction = () => {

    return async ({ result }) => {
          await invalidateAll();
          await applyAction(result);
			}
        
  };
</script>

<div class="main">
  <h1 class="title oswald">AnimeBeats</h1>
  <div class="main-form">
    <h2 class="oswald">{isLogin ? "Log in" : "Registro"}</h2>
    <form
      method="post"
      action={isLogin ? "?/login" : "?/register"}
      use:enhance={handleLog}
    >
      {#if !isLogin}
        <label for="username" transition:fade>Nombre de usuario</label>
        <input type="text" id="username" name="username" transition:fade />
        {#if form?.errors?.username && form.action === "register"}
          <p class="error-message">{form.errors.username[0]}</p>
        {/if}
      {/if}
      <label for="email"> Email </label>
      <input type="email" name="email" id="email" />
      {#if form?.errors?.email}
        <p class="error-message">{form.errors.email[0]}</p>
      {/if}
      <label for="password"> password </label>

      <div class="input-password-container">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          bind:value={password}
        />
        <button type="button" onclick={togglePasswordVisibility}>👁</button>
      </div>
      {#if form?.errors?.password}
        <p class="error-message">{form.errors.password[0]}</p>
      {/if}
      <!-- <div class="remember-container">
        <input type="checkbox" name="remember" id="remember-me">
              <label for="remember-me" id="remenber-label">
      Recordarme
              </label>
      </div> -->
      <button
        class="submit"
        type="submit"
        formaction={isLogin ? "?/login" : "?/register"}
        >{isLogin ? "log in" : "Sign up"}</button
      >
    </form>
    {#if form?.message}
      <p class="error-message">{form.message}</p>
    {/if}
    <p id="toggle-p">
      {isLogin ? "No" : "Ya"} tienes cuenta?
      <button onclick={toggleForm} id="toggle-btn"
        >{isLogin ? "Registrarte" : "Log in"}</button
      >
    </p>
  </div>
</div>

<style>
  .main {
    padding: 2rem 3rem;
  }
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  @media (width< 800px) {
    .main {
      padding: 1rem 1.5rem;
    }
  }
  /*
    Form
    */
  .main-form {
    background-color: var(--color-background-card);
    padding: 20px;
    width: 60%;
    margin: auto;
  }
  div h2 {
    font-size: 2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
  }
  .submit {
    background-color: var(--color-accent);
    width: 20%;
    padding: 5px;
    margin: auto;
    text-transform: uppercase;
    cursor: pointer;
    font-weight: 800;
    transition: transform 300ms ease-in-out;
  }
  .submit:hover {
    transform: scale(1.05);
  }
  .error-message {
    color: #ff4d4d;
    font-size: 0.875rem;
    margin-top: -5px;
    margin-left: 20px;
  }
  #toggle-p {
    text-align: center;
  }
  #toggle-btn {
    color: var(--color-accent);
    text-decoration: underline;
    transition: color 300ms ease-in;
  }
  #toggle-btn:hover {
    color: green;
  }

  input:not(input[type="checkbox"]):not(#password) {
    background-color: white;
    width: 95%;
    margin: auto;
    padding: 5px 10px; /* Añadido padding horizontal */
    margin-bottom: 10px;
    transition: all 300ms ease;
    color: black;
    box-sizing: border-box; /* Añadido para que el padding no afecte el ancho */
  }

  .input-password-container {
    width: 95%;
    margin: auto;
    margin-bottom: 10px; /* Para que coincida con los otros inputs */
    position: relative; /* Para posicionar el botón dentro de él */
  }

  .input-password-container input {
    background-color: white;
    width: 100%; /* Llena el contenedor */
    margin: 0; /* Sin margen */
    padding: 5px 40px 5px 10px; /* Padding: 5px top, 40px right (para el ojo), 5px bottom, 10px left */
    transition: all 300ms ease;
    color: black;
    box-sizing: border-box; /* Importante */
  }

  .input-password-container button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0 5px;
    color: #333; /* Color de ojo más sutil */
  }

  input:not(input[type="checkbox"]):focus,
  .input-password-container input:focus {
    outline: 3px solid var(--color-accent);
  }
  /* .remember-container{
    margin: auto;
  } */
  @media (width < 800px) {
    .main {
      width: 100%;
    }
    .submit {
      width: 50%;
    }
    .main-form {
      width: 100%;
    }
  }
</style>
