<script lang="ts">
  import type { IPost } from "$root/types/post";
  export let post: IPost;
</script>

<li class="post">
  <div class="post-title">{post.title}</div>
  <div class="post-body">{post.body}</div>
</li>

<style>
  .post {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    background: #f9f9f9;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }
  .post-title {
    font-size: 22px;
    font-weight: bold;
    text-align: center;
  }
  .post-body {
    font-size: 14px;
    color: #555;
    text-align: justify;
  }
</style>
