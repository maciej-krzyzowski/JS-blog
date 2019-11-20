'use strict';

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

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
        const linkHTMLData = {id: articleId, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);
        html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

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

function prepareClassNameForTags(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    let className = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    className = optCloudClassPrefix + className;
    return  className;
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
            const tagLinkHTMLData = {tagId: tag};
            const tagLinkHTML = templates.tagLink(tagLinkHTMLData);
            html = html + tagLinkHTML;
            if (!allTags.hasOwnProperty(tag)) {
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
        }
        tagWrapper.innerHTML = html;
    }
    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    const allTagsData = {tags: []};
    for (let tag in allTags) {
        allTagsData.tags.push({
            tag: tag,
            count: allTags[tag],
            className: prepareClassNameForTags(allTags[tag], tagsParams)
        });
    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
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

function generateAuthors(){
    let allAuthor = [];
    const authors = document.querySelectorAll(optArticleSelector);
    for (let author of authors) {
        const authorWrapper = author.querySelector(optAuthorSelector);
        let html = 'by ';
        const articleAuthor = author.getAttribute('data-author');
        const articleAuthorArray = [articleAuthor];
        for (let author of articleAuthorArray) {
            const authorLinkHTMLData = {authorId: articleAuthor};
            const authorLinkHTML = templates.authorLink(authorLinkHTMLData);
            html = html + authorLinkHTML;
            if (!allAuthor.hasOwnProperty(author)) {
                allAuthor[author] = 1;
            } else {
                allAuthor[author]++;
            }
        }
        authorWrapper.innerHTML = html;
    }
    const authorList = document.querySelector('.authors');
    const allAuthorData = {tags: []};
    for (let author in allAuthor) {
        allAuthorData.tags.push({
            author: author,
            count: allAuthor[author],
        })
    }
    authorList.innerHTML = templates.authorCloudLink(allAuthorData);
}

generateAuthors();

function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;

    const href = clickedElement.getAttribute('href');
    const activeAuthors = document.querySelectorAll('.post-author a.active');
    for (let activeAuthor of activeAuthors) {
        activeAuthor.classList.remove('active');
    }

    const addActiveAuthors = document.querySelectorAll('a[href="' + href + '"]');
    for (let addActiveAuthor of addActiveAuthors) {
        addActiveAuthor.classList.add('active');
    }
    generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthor(){
    const authors = document.querySelectorAll('.post-author a, .authors li a');
    for (let author of authors) {
        author.addEventListener('click', authorClickHandler);
    }
}

addClickListenersToAuthor();
