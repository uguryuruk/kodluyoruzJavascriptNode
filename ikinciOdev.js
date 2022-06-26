/*
Post Sıralama ve Post Ekleme
Blog oluşturmaya hazır mısınız? Konsol ekranında postlarımızı sıralayalım, sonrasında yeni bir post oluşturalım ve yeni post ile birlikte postlarımızı tekrar sıralayalım.
*/

const posts = [
    { name: "Post 1", content: "lorem 1" },
    { name: "Post 2", content: "lorem 2" },
    { name: "Post 3", content: "lorem 3" },
  ];
  
  const listPosts = () => {
    posts.map((post) => {
      console.log(post.name);
    });
  };
  
  const addPost = (newPost) => {
    const promisePost = new Promise((resolve, reject) => {
      if(!newPost.name)
        reject('Hata!');

     setTimeout(() => {
      posts.push(newPost);
      resolve(posts);
     }, 1000);
    });
  
    return promisePost;
  };
  
  async function showPosts() {
    try {

      await addPost({ name: "Post 4", content: "Lorem 4" });
      await addPost({ name: "Post 5", content: "Lorem 5" });
      // await addPost({ name: "", content: "" });
      listPosts();
    } catch (error) {
      console.log(error);
    }
  }
  console.log("ilk listemiz.");
  listPosts();
  console.log("Yeni eleman eklendikten sonra sıralama:");
  showPosts();