## form 表单

#### 属性

* accept：定能够通过文件上传进行提交的文件类型
* action：URL：规定当提交表单时向何处发送表单数据
* autocomplete：on/off：规定是否启用表单的自动完成功能
* enctype：application/x-www-form-urlencoded，multipart/form-data，text/plain：规定在发送表单数据之前如何对其进行编码
* method：get/post：规定用于发送 form-data 的 HTTP 方法
* name：规定表单的名称
* novalidate：novalidate：如果使用该属性，则提交表单时不进行验证
* target：_blank，_self，_parent，_top，framename：规定在何处打开 action URL

#### form表单提交方式

1. 通过type=submit提交

2. js提交form表单

        <form id="form" action="/url.do" method="post">
            <input type="text" name="name"/>
        </form>
        document.getElementById("form").submit();
3. ajax异步提交表单数据
4. form表单上传文件
> 使用form表单进行上传文件需要为form添加enctype="multipart/form-data" 属性，除此之外还需要将表单的提交方法改成post,如下 method="post", input type的类型需要设置为file

      <form action="/url.do" enctype="multipart/form-data" method="post">
          <input type="file" name="name"/>
          <input type="submit" value="提交">
      </form>

#### form表单无刷新提交方式
> 传统的form表单提交会导致页面刷新，但是在有些情况下，我们不希望页面被刷新

1. 隐藏的iframe
> form表单的target设置为iframe的name名称，form提交目标位当前页面iframe则不会刷新页面

      <form action="/url.do" method="post" target="targetIfr">
          <input type="text" name="name"/>
      </form>
      <iframe name="targetIfr" style="display:none"></iframe>
2. ajax提交
  * 一般数据
  > 通常我们提交（使用submit button）时，会把form中的所有表格元素的name与value组成一个queryString，提交到后台。这用jQuery的方法来说，就是serialize。但是上述方式，只能传递一般的参数，上传文件的文件流是无法被序列化并传递的，这时就用到了FormData

      $.ajax({
        url : "http://localhost:8080/STS/rest/user",
        type : "POST",
        data : $( '#postForm').serialize(),
        success : function(data) {},
        error : function(data) {}
      });

  * 上传文件用FormData

#### FormData
> 可以通过JavaScript用一些键值对来模拟一系列表单控件，使用FormData的最大优点就是我们可以异步上传一个二进制文件

* 创建
1. 创建一个空的FormData对象，然后再用append方法逐个添加键值对

        var formdata = new FormData();
        formdata.append("url", "http://www.baidu.com/")

2. 取得form元素对象，将它作为参数传入FormData对象中

        var formobj =  document.getElementById("form");
        var formdata = new FormData(formobj);

3. 利用form元素对象的getFormData方法生成它

        var formobj =  document.getElementById("form");
        var formdata = formobj.getFormData()

#### 方法

1. formData.append(name, value)：向已存在的键添加新的值，如该键不存在，新建之
> 通过 FormData.append()方法赋给字段的值若是数字会被自动转换为字符(字段的值可以是一个Blob对象,一个File对象,或者一个字符串,剩下其他类型的值都会被自动转换成字符串)
2. formData.delete(username)：将一对键和值从 FormData 对象中删除
3. formData.get(username)：返回给定键的第一个值
4. formData.getAll(username)：返回给定键的所有值
5. formData.has(username)：检查是否包含给定键，返回 true 或 false
6. formData.set(name, value)：设置给定键的值

#### Ajax通过FormData上传文件

        <form id="uploadForm" enctype="multipart/form-data">
          <input id="file" type="file" name="file"/>
          <button id="upload" type="button">upload</button>
        </form>
        $.ajax({
          url: '/upload',
          type: 'POST',
          cache: false,
          data: new FormData($('#uploadForm')[0]),
          processData: false,
          contentType: false
        })
* processData设置为false。因为data值是FormData对象，不需要对数据做处理。
* <form>标签添加enctype="multipart/form-data"属性。
* cache设置为false，上传文件不需要缓存。
* contentType设置为false，不设置contentType值，因为是由<form>表单构造的FormData对象，且已经声明了属性enctype="multipart/form-data"，所以这里设置为false。

#### 使用FormData对象添加字段方式上传文件

        <div id="uploadForm">
          <input id="file" type="file"/>
          <button id="upload" type="button">upload</button>
        </div>
        var formData = new FormData();
        formData.append('file', $('#file')[0].files[0]);
        $.ajax({
          url: '/upload',
          type: 'POST',
          cache: false,
          data: formData,
          processData: false,
          contentType: false
        })
* append()的第二个参数应是文件对象，即$('#file')[0].files[0]
* contentType也要设置为'false'

#### files对象的深层探究

    页面上写一个input，然后选俩个图片，打印这个input对象
    $("input[name='file1']").change( function(e){
        console.log($("input[name='file1']"))
    })
* 结果中有一个files字段：这个是fileList对象，是一个只读对象，不能修改，因为它不能修改，所以很难实现对已选中多个文件的删除某个文件等操作
* 里面记录了文件的name，size，type，和修改时间等，可知这个对象只存放了一些文件的信息，相当于是本地文件的索引，并不是把文件放到input中了，上传文件时它会再去找到实际的本地文件

#### 利用这个files对象，我们可以实现很多功能















blobs
































*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*