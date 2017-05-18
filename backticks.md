Long form of what I embedded in a card body without the comments.

		<script>
		  // convert code spans and blocks:
		  //     `...` to <code>...</code>
		  //     ^```$...^```$ to <pre><code>...</pre></code>
		  //     ^    ... to <pre><code>...</pre></code>
			// this is complicated since "lines" formed by block HTML tags, and spaces can
			// be HTML entities, but lines could also be started with newlines, and other
			// inconsistencies consequently this is not rigorous but also does more than 
			// needed for my personal flashcard needs
			var card = document.getElementsByClassName("card")[0];
			var html = card.innerHTML;
			// find code blocks marked by "lines" starting with four spaces, which can be HTML entities
			html = html.replace(/<(\w+)>(?:\s|&nbsp;){4}(.*?)<\/\1>/g, '<pre><code>$2</code></pre>');
			// combine adjacent code blocks resulting from multiple lines starting with 4 spaces
			html = html.replace('</code></pre><pre><code>', '\n');
			// find code blocks marked by "lines" starting with ```
			html = html.replace(/<(\w+)>```\s*<\/\1>(.*?)<(\w+)>```\s*<\/\3>/g, function(match, p1, p2, offset, string) {
				// remove tags wrapping each "line". not strictly necessary
				p2 = p2.replace(/<(\w+)>(.*?)<\/\1>/g, '$2\n')
			  return '<pre><code>' + p2 + '</code></pre>';
			});
			// remove last newline in code blocks
			html = html.replace('\n</code></pre>', '</code></pre>');
			// nonescaped backticks surrounding text lacking a closing tag
			// effectively ignore possible matches across "lines"
			//html = html.replace(/([^\\])`((?:.(?!<\/[^>]+>))*?[^\\])`/g, '$1<code>$2</code>');
			html = html.replace(/([^\\])`((?:.(?!<\/[^>]+>))*?[^\\])`/g, '$1<code>$2</code>');
			html = html.replace(/\\`/g, '`');
			card.innerHTML = html;
		</script>
