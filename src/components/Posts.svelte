<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import { useStorage } from "$root/stores/useStorage";
  import { get } from "svelte/store";
  import type { IPost } from "$root/types/post";
  import Post from "./Post.svelte";

  let posts = useStorage<IPost[]>("posts", []);
  let loading: boolean = true;
  let error: string | null = null;
  let isFromCache: boolean = false;

  const getPosts = async () => {
    try {
      loading = true;
      const { data } = await axios.get<IPost[]>("https://jsonplaceholder.typicode.com/posts");
      posts.set(data);
    } catch (err) {
      error = "Нет данных для отображения";
      console.error(error, err);
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    let storedPosts = get(posts);
    if (storedPosts && storedPosts.length > 0) {
      isFromCache = true;
      loading = false;
    } else {
      await getPosts();
    }
  });
</script>

<main>
  {#if loading}
    <p class="loading">⏳ Загрузка...</p>
  {:else if error}
    <p class="error">⚠️ {error}</p>
  {:else}
    {#if isFromCache}
      <p class="cache-notice">📦 Данные загружены из кэша</p>
    {/if}
    <ul class="posts-list">
      {#each $posts as post}
        <Post {post} />
      {/each}
    </ul>
  {/if}
</main>

<style>
  .loading, .error, .cache-notice {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding: 12px;
    border-radius: 8px;
    width: fit-content;
    margin: 15px auto;
  }

  .loading {
    color: white;
    background-color: #007bff;
    animation: pulse 1.5s infinite;
  }

  .error {
    color: white;
    background-color: #dc3545;
  }

  .cache-notice {
    color: white;
    background-color: #28a745;
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.6; }
    100% { opacity: 1; }
  }

  .posts-list {
    margin-top: 20px;
    padding: 0;
    list-style: none;
  }
</style>