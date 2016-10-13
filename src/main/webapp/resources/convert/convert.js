$(document).ready(function() {
	// alert("test");
	console.log("Specified script");
	// $.extend(FormSerializer.patterns, {
	// validate : /^[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)*(?:\[\])?$/i
	// });
	/**
	 * 扩展jquery，加入方法使用form表单转成spring可识别的json对象
	 * 使用 $('#formid').serializeObject();
	 */
	jQuery.fn.serializeObject = function() {
		var arrayData, objectData;
		arrayData = this.serializeArray();
		objectData = {};

		$.each(arrayData, function() {
			var value;
			value = this.value || '';
			if (objectData[this.name] != null) {
				if (!objectData[this.name].push) {
					objectData[this.name] = [ objectData[this.name] ];
				}
				objectData[this.name].push(value);
			} else {
				objectData[this.name] = value;
			}
		});
		return objectData;
	};
	ajaxJSONNestedConvert();
	$("#converter-collection3").bind("click",collection3Handler);
});


/**
 * ajax json nested convert handler;
 */
function ajaxJSONNestedConvert() {
	var link = $('#ajaxJSONNestedProp');
	// /convert/bean?nested.foo=bar&nested.list[0].foo=baz&nested.map[key].list[0].foo=bip
	var form = document.createElement("form");
	form.appendChild($("#ajax-json-nested-v-1")[0]);
	form.appendChild($("#ajax-json-nested-v-2")[0]);
	form.appendChild($("#ajax-json-nested-v-3")[0]);
	console.dir(form);
	// var data = {
	// 'nexted.foo' : 'bar',
	// 'nested.list[0].foo' : 'baz'
	// };

	var jsonFormData = $(form).serializeObject();
	$.ajax({
		url : '/convert/bean',
		data : jsonFormData,
		success : function(text) {
			MvcUtil.showSuccessResponse(text, link);
			console.log("success");
			console.dir(text);
		},
		error : function(xhr) {
			MvcUtil.showErrorResponse(xhr.responseText, link);
			console.log("fail");
			console.dir(xhr);
		}
	});

}
/**
 * collection3 handler 
 */
function collection3Handler(){
	console.log("collection3 handler");
	var $link=$('#collection3');
	var $data=$("input[name='values']");
	console.dir($data);
	console.dir($data.serialize());
	
	$.ajax({
		url : '/convert/collection',
		data : $data.serialize(),
		success : function(text) {
			MvcUtil.showSuccessResponse(text, $link);
			console.log("success");
			console.dir(text);
		},
		error : function(xhr) {
			MvcUtil.showErrorResponse(xhr.responseText, $link);
			console.log("fail");
			console.dir(xhr);
		}
	});
}