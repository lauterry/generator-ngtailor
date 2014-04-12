angular.module('<%= name %>', [<%= angularDeps %>]);

<% if (angularProviders.length) {%>

angular.module('<%= name %>').config(function(<%= angularProviders %>) {

    "use strict";

});

<% } %>
