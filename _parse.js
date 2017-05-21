var currentdate = new Date(); 
var version = '2';

function setDisplay(selector, display) {
  [].forEach.call(document.querySelectorAll(selector), function (el) { el.style.display = display; });
}

(function parse() {
  document.getElementById("sanity").innerHTML = [currentdate.getMinutes(), currentdate.getSeconds(), version].join(' ');

  var article = document.getElementsByTagName("article")[0];
  
  var subdeck = article.dataset.deck.replace(/^General(?:::Language)?::((?:(?!::).)*)(?:::.*)?/, '$1');
  setDisplay('.subdeck', 'none');
  if(subdeck === ''){
    setDisplay('.subdeck.Other', '');
  } else {
    setDisplay('.subdeck.' + subdeck, '');
  }

  document.getElementById("sanity").innerHTML = [document.getElementById("sanity").innerHTML, subdeck].join(' ');

  var fields = document.getElementsByClassName("parsefield");
  for (var i=0, max=fields.length; i < max; i++) {
    fields[i].innerHTML = codeBlocks2(fields[i].innerHTML)
    console.log(fields[i].innerHTML)
  }
})()

function codeBlocks1(text){
    return text
    // this is complicated since "lines" formed by block HTML tags, and spaces can
    // be HTML entities (lines could also be started with newlines but they wouldn't
    // display in Anki's editor, so I will assume all data is on one line), and other
    // inconsistencies consequently this is not rigorous but also does more than 
    // needed for my personal flashcard needs

    // wrap code blocks in <pre><code>

    // block contains three backticks followed by space or nothing
    // breaks if content not all on one line so could either be fixed or simplified
    .replace(/<(\w+)>```(?:(?!\n)\s|&nbsp;)*<\/\1>(.*?)<(\w+)>```(?:(?!\n)\s|&nbsp;)*<\/\3>/g, function(match, p1, p2, p3, offset, string){
      // remove wrapping tags from each line. not strictly necessary
      p2 = p2.replace(/<(\w+)>(.*?)<\/\1>/g,'$2\n');
      return ['<pre><code>', p2, '</code></pre>'].join('');
    })
    // block contents beginning with four spaces or encoded spaces, or a tab
    .replace(/<(\w+)>(?:\t|(?:(?!\n)\s|&nbsp;){4})(.*?)<\/\1>/g, '<pre><code>$2</code></pre>')
    // line beginning with a tab, or four spaces or encoded spaces but not newlines
    .replace(/^(?:\t|(?:(?!\n)\s|&nbsp;){4})(.*?)$/mg, '<pre><code>$1</code></pre>')
    // merge consecutive pre code blocks separated by whitespace or newlines
    .replace(/<\/code><\/pre>[\s\n]*<pre><code>/g, '\n')
    //
    .replace('\n</code></pre>', '</code></pre>')

    // wrap code spans in <code>

    // backticks surrounding content not containing code tag or within code block 
    .replace(/([^\\])`((?:(?!<\/?code>)[^`])*[^\\])`(?!(?:(?!<code>).)*<\/code>)/g, '$1<code>$2</code>')
    // unescape escaped backticks for display
    .replace(/\\`/g, '`')
    
    // make hyphens nonbreaking if they don't follow alphanum
    .replace(/([^A-Za-z0-9])-/g,'$1&#8209;')
}

function codeBlocks2(text){
    // let's try reducing to plain text and then parsing...

    return text

    // insert newline after closing blocks not followed by opening blocks to make matching easier
    // maybe only need followed by blocks that might contain triple backticks (or leading space...), and consider <br>...
    .replace(/(<\/(?:article|aside|blockquote|div|dl|ol|ul|figcaption|figure|form|h\d|header|hr|main|nav|p|pre|section|table|video)>(?:(?!\n)\s|&nbsp;)*)(?!<\/(?:article|aside|blockquote|div|dl|ol|ul|figcaption|figure|form|h\d|header|hr|main|nav|p|pre|section|table|video)(?: [^>]+)?>)/g, '$1\n')

    // normalize any triple backticks
    //   remove trailing whitespace excluding newline
    .replace(/```(?:(?!\n)\s|&nbsp;)*/g, '```')


    //   unwrap from subset of block tags preserving next lines if exists inside
    .replace(/<(blockquote|div|p|pre|section)>```<\/\1>/g, '```\n')
    //   followed by <br>
    //.replace(/(<\/[^>]+>)?(```)(?:(?!\n)\s|&nbsp;)*<br(?: [^>]+)?>/g, '$1$2\n')


    //   followed by any opening block tag
//    .replace(/^(```)(?:(?!\n)\s|&nbsp;)*(<(?:article|aside|blockquote|div|dl|ol|ul|figcaption|figure|form|h\d|header|hr|main|nav|p|pre|section|table|video)(?: [^>]+)?>)/mg, '$1\n$2')
    //   following <br>
//    .replace(/<br(?: [^>]+)?>(```)(?:(?!\n)\s|&nbsp;)*/g, '\n$1')
    //   following any closing block tag
//    .replace(/(<\/(?:article|aside|blockquote|div|dl|ol|ul|figcaption|figure|form|h\d|header|hr|main|nav|p|pre|section|table|video)>)(```)(?:(?!\n)\s|&nbsp;)*/g, '$1\n$2')

    // wrap any remaining triple backticks in <div>


    // wrap code blocks in <pre><code>

    // // block contains three backticks followed by space or nothing
    // // breaks if content not all on one line so could either be fixed or simplified
    // .replace(/<(\w+)>```(?:(?!\n)\s|&nbsp;)*<\/\1>(.*?)<(\w+)>```(?:(?!\n)\s|&nbsp;)*<\/\3>/g, function(match, p1, p2, p3, offset, string){
    //   // remove wrapping tags from each line. not strictly necessary
    //   p2 = p2.replace(/<(\w+)>(.*?)<\/\1>/g,'$2\n');
    //   return ['<pre><code>', p2, '</code></pre>'].join('');
    // })
    // // block contents beginning with four spaces or encoded spaces, or a tab
    // .replace(/<(\w+)>(?:\t|(?:(?!\n)\s|&nbsp;){4})(.*?)<\/\1>/g, '<pre><code>$2</code></pre>')
    // // line beginning with a tab, or four spaces or encoded spaces but not newlines
    // .replace(/^(?:\t|(?:(?!\n)\s|&nbsp;){4})(.*?)$/mg, '<pre><code>$1</code></pre>')
    // // merge consecutive pre code blocks separated by whitespace or newlines
    // .replace(/<\/code><\/pre>[\s\n]*<pre><code>/g, '\n')
    // //
    // .replace('\n</code></pre>', '</code></pre>')

    // // wrap code spans in <code>

    // // backticks surrounding content not containing code tag or within code block 
    // .replace(/([^\\])`((?:(?!<\/?code>)[^`])*[^\\])`(?!(?:(?!<code>).)*<\/code>)/g, '$1<code>$2</code>')
    // // unescape escaped backticks for display
    // .replace(/\\`/g, '`')
    
    // // make hyphens nonbreaking if they don't follow alphanum
    // .replace(/([^A-Za-z0-9])-/g,'$1&#8209;')
}
