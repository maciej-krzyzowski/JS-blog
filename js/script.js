'use strict';
const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optAuthorSelector = '.post-author',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-';

function titleClickHandler(event) {

    const clickedElement = this;
    event.preventDefault();

    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    const activeArticles = document.querySelectorAll('.posts .active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    this.classList.add('active');
    const articleSelector = clickedElement.getAttribute('href');
    const tergetArticle = document.querySelector(articleSelector);
    tergetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

// INNY SPOSÓB WYŚWIETLANIA LISTY PO LEWEJ
// function generateTitleLinks() {
//     const titleList = document.querySelector(optTitleListSelector);
//     titleList.innerHTML = '';
//     const articles = document.querySelectorAll(optArticleSelector);
// console.log(articles);
//     for (let article of articles) {
//         const articleId = article.getAttribute('id');
//         const articleTitle = article.querySelector(optTitleSelector).innerHTML;
//         const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
//         titleList.insertAdjacentHTML("beforeend", linkHTML);
//     }
// }

generateTitleLinks();

function calculateTagsParams(tags) {
    const params = {
        min : 999,
        max : 0,
    };
    for (let tag in tags) {
        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.min);
    }
    return params;
}

function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return classNumber;
}

function generateTags(){
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        const tagWrapper = article.querySelector(optArticleTagsSelector);
        let html = '';
        const articleTags = article.getAttribute('data-tags');
        const articleTagsArray = articleTags.split(' ');
        for (let tag of articleTagsArray) {
            const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
            html = html + tagLinkHTML;
            if(!allTags.hasOwnProperty(tag)) {
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
        }
        tagWrapper.innerHTML = html;
    }
    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    let allTagsHTML = '';
    for (let tag in allTags) {
        allTagsHTML += '<li><a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '<span class="styleTag">(' + allTags[tag] + ')</span></a></li>';
    }
    tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
    event.preventDefault();
    const clickedElement = this;

    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let activeTag of activeTags) {
        activeTag.classList.remove('active');
    }

    const tagsCollection = document.querySelectorAll('a[href="' + href + '"]');
    for (let item of tagsCollection) {
        item.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
    const tags = document.querySelectorAll('.post-tags .list a, .tags li a');
    for (let tag of tags) {
        tag.addEventListener('click', tagClickHandler);
    }
}

addClickListenersToTags();

function generateAuthors() {
    const authors = document.querySelectorAll(optArticleSelector);
    for (let author of authors) {
        const authorList = author.querySelector(optAuthorSelector);
        let html = 'by ';
        const articleAuthor = author.getAttribute('data-author');
        const authorLinkHTML = '<a href="' + articleAuthor + '">' + articleAuthor + '</a>';
        html = html + authorLinkHTML;
        authorList.innerHTML = html;
    }
}

generateAuthors();

function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;

    const author = clickedElement.getAttribute('href');
    const activeAuthors = document.querySelectorAll('.post-author a.active');
    for (let activeAuthor of activeAuthors) {
        activeAuthor.classList.remove('active');
    }

    const addActiveAuthors = document.querySelectorAll('a[href="' + author + '"]');
    for (let addActiveAuthor of addActiveAuthors) {
        addActiveAuthor.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthor(){
    const authors = document.querySelectorAll('.post-author a');
    for (let author of authors) {
        author.addEventListener('click', authorClickHandler);
    }
}

addClickListenersToAuthor();
