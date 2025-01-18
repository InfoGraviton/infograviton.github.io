---
layout: default
---
<h1>Suggestions</h1>

<p>Here is a list of papers that could be interesting to discuss in our meetings.</p>

<!--<h3>Spotlight</h3>-->
<ul>
{% assign SuggsYears = site.suggestions | group_by: 'year' | reverse }}%}
{% assign Suggs = SuggsYears | sort: 'author' }}%}
{% for paper in Suggs %}
    <li><a href="{{ seminar.url }}"><strong>{{ paper.title }}</strong></a></li>
    <p>{{ paper.author }}</p>
    <p>{{ paper.reference }}</p>
    <p>{{ paper.abstract }}</p>
{% endfor %}
</ul>
