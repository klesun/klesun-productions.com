
var Util = Util || {};

Util.TableGenerator = function()
{
	/** @argument colModel has same format as colModel of JqGrid 
	  * @argument title - optional, any $.append()-able value (string/dom)
	  * @return <table/> $(DOM)-objet */
	var generateTable = function(colModel, rowList, title, chunkSize, breakDuration)
	{
		var table = $('<table style="width:100%;" class="table" cellspacing="1"></table>');
		if (typeof title !== 'undefined')
		{
			table.append(generateTitleRow(title));
		}
		table.append(generateCaptionRow(colModel));

		chunkSize = chunkSize || 1000000; // browser would die anyways with such row ammount
		breakDuration = breakDuration || 100;

		/** @TODO: add some sign that we finished loading */
		Util.forEachBreak(rowList, breakDuration, chunkSize, row => table.append(generateRow(colModel, row)));

		return table;
	};

	function generateTitleRow(title)
	{
		var titleCont = $('<td colspan="100" style="background-color:#DDDDEE;"></td>')
				.append(title);
		return $('<tr class="table-generator-title-tr"></tr>').append(titleCont);
	}

	/** @argument colModel - [{"caption": str}, ...] */
	function generateCaptionRow(colModel)
	{
		var row = $('<tr class="captionRow"></tr>');
		for (var i = 0; i < colModel.length; ++i)
		{
			row.append('<td>' + colModel[i].caption + '</td>');
		}

		return row;
	}

	function generateRow(colModel, row)
	{
		var rowDom = $('<tr></tr>');
		for (var i = 0; i < colModel.length; ++i)
		{
			var fieldName = colModel[i].name;
			var formatter = typeof(colModel[i].formatter) === 'function'
					? colModel[i].formatter 
					: function (cell) { return cell; };
					
			var $td = $('<td></td>');
			$td.append(formatter(row[fieldName], row));
			rowDom.append($td);
		}

		return rowDom;
	}
	
	return {
		generateTable: generateTable,
	};
};
