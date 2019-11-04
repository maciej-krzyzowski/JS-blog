'use strict';

function titleClickHandler(event) {

    const clickedElement = this;
    event.preventDefault();
    console.log('Link was clicked!');
    console.log(event);
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    this.classList.add('active');
    console.log('clickedElement:', clickedElement);
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
    /* find the correct article using the selector (value of 'href' attribute) */
    const tergetArticle = document.querySelector(articleSelector);
    console.log(tergetArticle);
    /* add class 'active' to the correct article */
    tergetArticle.classList.add('active');
}
const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}