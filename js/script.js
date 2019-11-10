'use strict';

function titleClickHandler(event) {

  const clickedElement = this;
  event.preventDefault();
  console.log('Link was clicked!');
  console.log(event);

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  const activeArticles = document.querySelectorAll('.posts .active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  this.classList.add('active');
  console.log('clickedElement:', clickedElement);

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  const tergetArticle = document.querySelector(articleSelector);
  console.log(tergetArticle);

  tergetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  console.log('Function executed');

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links + 'Zostało wykonane');
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

// INNY SPOSÓB WYŚWIETLANIA LISTY PO LEWEJ
// function generateTitleLinks() {
//     console.log('Funkcja została wykonana')
//     const titleList = document.querySelector(optTitleListSelector);
//     titleList.innerHTML = '';
//     const articles = document.querySelectorAll(optArticleSelector);
//     console.log(articles);
//     for (let article of articles) {
//         const articleId = article.getAttribute('id');
//         const articleTitle = article.querySelector(optTitleSelector).innerHTML;
//         const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
//         titleList.insertAdjacentHTML("beforeend", linkHTML);
//     }
// }

// generateTitleLinks();
