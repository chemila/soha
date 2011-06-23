/**
 * Javascript wrapper for the Google Chart API. Enables users
 * to render charts from the API with a small piece of javascript.
 * This is software is still in development.
 * @author Bas Wenneker <b.wenneker@gmail.com>
 * @website <http://www.solutoire.com>
 * @date 12-11-2007 
 * @version 0.2 alpha.
 */
GChart = function(){
	/**
	 * Helper function extends the first argument with the second.
	 * @return {Object} The merged object.
	 */
	var extend = function(){
		var args = arguments;
		if (!args[1]) args = [this, args[0]];
		for (var property in args[1]) args[0][property] = args[1][property];
		return args[0];
	};	
	/**
	 * Helper function for document.getElementById();
	 * @param {String} e ID of the element to be returned.
	 * @return {Element, Boolean} Returns the element with the passed id or false when the element doesn't exist.
	 */
	var get = function(e){		
		return (typeof e == 'string') ? document.getElementById(e) : (e || false);		
	};		
	/**
	 * Url helper function that returns a GET formated url part.
	 * @param {String} o Option string.
	 * @param {String} key GET key.
	 * @param {String} ch Seperator string.
	 * @return {String} GET request.
	 */
	var urlhelper = function(o, key, ch){
		o = GChart.options[o];
		return (o !== null && typeof o != 'undefined') ? '&ch' + key + '=' + ((typeof o == 'object') ? o.join(ch || ',') : o) : '';
	};	
	return {
		/**
		 * Sets the options for the GChart object. The options are evaluated
		 * in getUrl() using the private urlhelper().
		 * @since 0.1 alpha
		 * @param {Object} o Options object.
		 * @return void
		 */
		setOptions : function(o){
			this.options = extend({
				/**
				 * @type {String, Element} renderTo The id of the node or a DOM node that will be the container to render the chart into.
				 */
				renderTo: false,
				/**
				 * @type {String, Element} applyTo The id of the node or a DOM node corresponding to an IMG that is already present.
				 */
				applyTo: false,
				/**
				 * @type {String} size Specifies the size of the chart like <width in pixels>x<height in pixels> (defaults to 300x200).
				 */
				size: '300x200',				
				/**
				 * @type {String, Array} data Dataset(s) for the chart, can be a multidimensional array or a encoded string (defaults to null).
				 */
				data: null,
				/**
				 * @type {String} encoding Specifies the chart encoding, can be 'simple' or 's', 'text' or 't' and 'extended' or 'e' (defaults to 's').
				 */
				encoding: 's',
				/**
				 * @type {String} type Specifies the type of the chart (defaults to 'lc').
				 */
				type: 'lc',				
				/**
				 * @type {String, Array} colors Colorset, can be an array (['color1','color2','colorn']) or String ('<color1>,<color2,<colorn>') (defaults to null).
				 */
				colors: null,
				/**
				 * @type {String, Array} fill Fill options, see <http://code.google.com/apis/chart/#chart_or_background_fill> (defaults to null).
				 */
				fill: null,				
				/**
				 * @type {String} title Chart title (defaults to null).
				 */
				title: null,
				/**
				 * @type {String, Array} titlestyle Title style, can be an Array (['color','fontsize']) or a formatted string '<color>,<font-size>' (defaults to null).
				 */
				titlestyle: null,
				/**
				 * @type {String, Array} legend Legend, can be an array or a formatted string (defaults to null).
				 */
				legend: null,
				/**
				 * @type {String, Array} pielabels Labels for pie charts (defaults to null).
				 */
				pielabels: null,
				/**
				 * @type {String} axistype Axis type.
				 */
				axistype: 'x,y',
				/**
				 * @type {String, Array} axisrange Specify the range for the axis, keep in mind the chart coordinates don't scale (defaults to null)
				 */
				axisrange: null,
				/**
				 * @type {String, Array} labels (defaults to null);
				 */
				labels: null,
				/**
				 * @type {String, Array} labelpositions Positions of labels (defaults to null);
				 */
				labelpositions: null,
				/**
				 * @type {String, Array} linestyles Label CSS styles (defaults to null);
				 */
				linestyles: null,
				/**
				 * @type {String, Array} axisstyles Axis CSS styles (defaults to null);
				 */
				axisstyles: null,
				/**
				 * @type {String, Array} grid Grid definition (defaults to null);
				 */
				grid: null,
				/**
				 * @type {String, Array} markers Markers (defaults to null);
				 */
				markers: null,				
				/**
				 * @type {Integer} max Specifies the max value of a dataset, read <http://code.google.com/apis/chart/#encoding_data> maxValue (defaults to false).
				 */
				max: false,
				/**
				 * @type {String} alt Image alt attribute (defaults to '').
				 */
				alt: '',
				/**
				 * @type {String} id Id to apply to the image that's inserted or returned (defaults to null).
				 */
				id: null
			}, o || {});
			this.options.encoding = this.options.encoding.charAt(0);
			return this.options;
		},
		/**
		 * Function translates the passed object or this.options.data to a encoded string. This
		 * function handles the three encoding type specified by the Google Chart API: 'simple',
		 * 'text' and 'extended'. Read more about the encoding types on the Google Chart API Project page.
		 * @since 0.1 alpha
		 * @param {Object} d Encodes the data according to the encoding type specified in this.options.
		 * @return {String} Returns passed data in encoded format.
		 */
		getEncodedData : function(d){
			var d = d || this.options.data;						
			var str = '';	
			switch(this.options.encoding){
				default: case 'e': case 's':					
					if(d.length && typeof d[0] == 'object'){
						for(var i = 0, dln = d.length; i < dln; i++){
							str += ',' + this.getEncodedData(d[i]);
						}
						return str.substring(1);
					}else{
						if(typeof d == 'string') return d;
						var encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
						if(this.options.encoding == 'e') encoding += '-.';			
						var constant = (encoding.length - 1) / (this.options.max || (encoding.length - 1));					
						for(var i = 0, dln = d.length; i < dln; i++){							
							if(this.options.encoding == 's'){
								str += ((!isNaN(d[i]) && d[i] >= 0) ? encoding.charAt(Math.round(constant * d[i])) : '_');
							}else if (this.options.encoding == 'e'){
								str += ((!isNaN(d[i]) && d[i] >= 0) ? encoding.charAt(Math.round(Math.floor(constant * d[i] / 64))) + encoding.charAt(Math.round(constant * (d[i] % 64))) : '__');
							}
						}
						return str;
					}
					break;
				case 't':
					if(typeof d == 'string') return d;
					if (d.length && typeof d[0] == 'object') {
						for(var i = 0, dln = d.length; i < dln; i++){
							str += '|' + (d[i]).join(',');
						}
						return str.substring(1);
					}
					return d.join(',');
			}			
		},
		/**
		 * Function combines the options into a url that can be used to
		 * display a chart from the Google Chart API.
		 * @since 0.1 alpha
		 * @return {String} Returns the url for the Google Chart API.
		 */
		getUrl : function(){
			var url = 'http://chart.apis.google.com/chart?';

			url += 'chs=' + this.options.size;
			url += '&cht=' + this.options.type;			

            if(this.options.type == 'gv') {
			    url += '&chl=digraph{' + this.getEncodedData(this.options.data) + '}';
            }
            else {
			    url += '&chd=' + this.options.encoding + ':' + this.getEncodedData(this.options.data);

                url += urlhelper('colors','co');			
                url += urlhelper('fill','f','|');
                url += urlhelper('title','tt');
                url += urlhelper('legend','dl','|');
                url += urlhelper('pielabels','l','|');
                url += urlhelper('axistype','xt');			
                url += urlhelper('labels','xl','|');
                url += urlhelper('axispositions','xp','|');
                url += urlhelper('axisrange','xr','|');
                url += urlhelper('axisstyles','xp','|');
                url += urlhelper('linestyles','ls','|');
                url += urlhelper('grid','g');
                url += urlhelper('markers','m','|');
            }

			return url.replace(/\s/g,'+');
		},
		/**
		 * Function that inserts, applies or returns an img object based
		 * on the passed arguments.
		 * @since 0.1 alpha
		 * @param {Object} o
		 */
		render : function(o){
			if(o) o = this.setOptions(o);
			else o = this.options;
			var url = this.getUrl();	
			if((img = get(o.applyTo))){
				img.src = url;
			}else{
				var img = document.createElement('img');
				img.src = url;
				img.alt = o.alt;
				if(o.id) img.id = o.id;
				if(o.renderTo !== false){				
                    console.info(get(o.renderTo));
					(get(o.renderTo)).appendChild(img);					
				}
				return img;								
			}
		}
	};
}();
