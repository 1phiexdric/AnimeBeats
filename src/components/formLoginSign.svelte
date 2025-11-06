<script lang="ts">
  import {email, z} from "zod";
  import { fade } from "svelte/transition";
  let isLogin = true;
  let showPassword = false;
  function toggleForm() {
    isLogin = !isLogin;
  }
  const registerSchema = z.object({
    email: z.string().email({message:"Por favor, introduce un email valido"}),
    password: z.string().min(6, {message: "La contraseña debe tener al menos 6 caracteres"}),
    username: z.string().min(3, {message: "El nombre de usuario debe tener al menos 3 caracteres"}),
  })
  const loginSchema = z.object({
    email: z.string().email({message:"Por favor, introduce un email valido"}),
    password: z.string().min(1, {message: "La contraseña no debe estar vacia"})
  })

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
  let errors: Record<string, string[]> = {}
  function submit(event: SubmitEvent){
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    // name= valor, input.value= clave
    const data = Object.fromEntries(formData)
    const schema = isLogin ? loginSchema : registerSchema;
    const result = schema.safeParse(data)
    if(!result.success){
      errors = result.error.flatten().fieldErrors
      console.log(errors);
    }else{
      errors = {}
      console.log('!Datos validados', result.data);
    }
  }
</script>

<div class="main">
  <h2 class="oswald">{isLogin ? "Log in" : "Registro"}</h2>
  <form onsubmit={submit}>
    {#if !isLogin}
      <label for="username" transition:fade>Nombre de usuario</label>
      <input type="text" id="username" name="username" transition:fade/>
      {#if errors.username}
        <p class="error-message">{errors.username[0]}</p>
      {/if}
    {/if}
    <label for="email"> Email </label>
    <input type="email" name="email" id="email"/>
    {#if errors.email}
      <p class="error-message">{errors.email[0]}</p>
    {/if}
    <label for="password"> password </label>

    <div class="input-password-container">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
      />
      <button type="button" onclick={togglePasswordVisibility}>👁</button>
    </div>
{#if errors.password}
      <p class="error-message">{errors.password[0]}</p>
    {/if}
    <button class="submit" type="submit">{isLogin ? "log in" : "Sign up"}</button>
    </form>
  <p id="toggle-p">
    {isLogin ? "No" : "Ya"} tienes cuenta?
    <button onclick={toggleForm} id="toggle-btn"
      >{isLogin ? "Registrarte" : "Log in"}</button
    >
  </p>
</div>

<style>
  .main {
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
  .error-message{
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

  /* --- CAMBIOS PRINCIPALES AQUÍ --- */

  /* 1. Regla general para inputs:
     Le decimos que NO aplique al input de contraseña (#password)
     porque lo manejaremos de forma especial.
     También añadí box-sizing y un padding horizontal (5px 10px) */
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

  /* 2. Contenedor de la contraseña:
     Este DIV ahora toma el lugar del input en el layout.
     Le damos el mismo ancho, margen y posición relativa. */
  .input-password-container {
    width: 95%;
    margin: auto;
    margin-bottom: 10px; /* Para que coincida con los otros inputs */
    position: relative; /* Para posicionar el botón dentro de él */
  }

  /* 3. Input de contraseña DENTRO del contenedor:
     Hacemos que llene el 100% de su contenedor y le damos
     el padding derecho para hacer espacio al botón. */
  .input-password-container input {
    background-color: white;
    width: 100%; /* Llena el contenedor */
    margin: 0; /* Sin margen */
    padding: 5px 40px 5px 10px; /* Padding: 5px top, 40px right (para el ojo), 5px bottom, 10px left */
    transition: all 300ms ease;
    color: black;
    box-sizing: border-box; /* Importante */
  }

  /* 4. Botón del ojo DENTRO del contenedor:
     Lo posicionamos de forma absoluta, centrado verticalmente
     y a la derecha. */
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

  /* 5. Regla de Focus:
     La unificamos para que aplique a ambos tipos de input */
  input:not(input[type="checkbox"]):focus,
  .input-password-container input:focus {
    outline: 3px solid var(--color-accent);
  }

  @media (width < 800px) {
    .main {
      width: 100%;
    }
    .submit {
      width: 50%;
    }
  }
</style>