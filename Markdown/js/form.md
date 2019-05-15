## form 表单整理

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

###### 属性

* File.lastModified：返回文件的上次修改时间，以UNIX纪元（1970年1月1日午夜）为单位，以毫秒为单位
* File.lastModifiedDate：返回对象引用的文件的最后一次修改
* File.name：返回File对象引用的文件的名称
* File.webkitRelativePath：返回相对于其的URL的路径File
* File.size：以字节为单位返回文件的大小，继承自Blob
* File.type：返回文件的MIME类型：继承自Blob

###### 方法
> 该File接口并没有定义任何方法，但继承方法的Blob接口

* Blob.slice([start[, end[, contentType]]])：返回一个新Blob对象，该对象包含源的指定字节范围内的数据Blob

#### 利用这个files对象，我们可以实现很多功能

1. 选择图片本地预览图片
    * 利用window的url工具将文件生成url，再将url赋值给img的src属性
    * 利用fileReader读取文件
2. 实现文件拖拽并上传文件
> 因为拖拽的区域只是一个div，无法进行上传操作，所以需要加一个form和input，让拖拽进去的文件进入input中,取出files后，用$("#file1")[0].files=files;将文件赋值给input

#### window.URL
###### 方法
* window.URL.createObjectURL(param)
> param为fileList对象或者blob对象，返回的事blob对象
* window.URL.revokeObjectURL()
> 在每次调用 createObjectURL() 方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用 URL.revokeObjectURL() 方法来释放。浏览器会在文档退出的时候自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。

        var files = e.originalEvent.dataTransfer.files;
        $("#file1")[0].files=files;   //关键：将取到的文件赋值给input，用于ajax提交文件！！！
        var formData = new FormData($("#form1")[0]);
        $.ajax({
          url : "/it/orderManage/saveActivity",
          type : 'POST',
          data : formData,
          processData : false,
          contentType : false,
          async : true,
          success : function() {}
        });

#### fileReader
> 方法并不会返回读取结果，这一结果存储在result属性中

* 方法
    1. readAsBinaryString：参数：file/blob：result属性中将包含所读取文件的原始二进制数据
    2. readAsText：参数：file/blob：result属性中将包含一个字符串以表示所读取的文件内容
    3. readAsDataURL：参数：file/blob：result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容
    4. readAsArrayBuffer()：参数：file/blob： result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象
    5. abort：终止读取操作

* 事件
    1. onabort：中断
    2. onerror：出错
    3. onloadstart：开始
    4. onprogress：正在读取
    5. onload：成功读取
    6. onloadend：读取完成，无论成功失败

            var reader = new FileReader(); 
            //将文件以Data URL形式读入页面 
            reader.readAsDataURL(file); 
            reader.onload=function(e){ 
              console.log(e.target.result);
              var result=document.getElementById("result"); 
              //显示文件 
              result.innerHTML='<img src="' + this.result +'" alt="" />';
            } 

#### 拖拽事件

1. 在拖动目标上触发事件 (源元素)
* ondragstart：用户开始拖动元素时触发
* ondrag：元素正在拖动时触发
* ondragend：用户完成元素拖动后触发

2. 释放目标时触发的事件
* ondragenter：当被鼠标拖动的对象进入其容器范围内时触发此事件
* ondragover：当某被拖动的对象在另一对象容器范围内拖动时触发此事件
* ondragleave：当被鼠标拖动的对象离开其容器范围内时触发此事件
* ondrop：在一个拖动过程中，释放鼠标键时触发此事件

#### blob

* Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据
* File接口就是基于Blob，继承blob功能并将其扩展为支持用户系统上的文件，也就是说：File接口中的Flie对象就是继承与Blob对象

###### 创建

* var aBlob = new Blob( array, options );
    * array 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的 Array ，或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings会被编码为UTF-8
    * options 是一个可选的BlobPropertyBag字典，它可能会指定如下两个属性：
        * type，默认值为 ""，它代表了将会被放入到blob中的数组内容的MIME类型。
        * endings，默认值为"transparent"，用于指定包含行结束符\n的字符串如何被写入。 它是以下两个值中的一个： "native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "transparent"，代表会保持blob中保存的结束符不变 

###### 属性

* Blob.size：Blob 对象中所包含数据的大小
* Blob.type：一个字符串，表明该Blob对象所包含数据的MIME类型。如果类型未知，则该值为空字符串
* Blob.isClosed：布尔值，指示 Blob.close() 是否在该对象上调用过。 关闭的 blob 对象不可读

###### 方法

* Blob.slice([start,[ end ,[contentType]]])：返回一个新的 Blob对象，包含了源 Blob对象中指定范围内的数据
* Blob.close()：关闭 Blob 对象，以便能释放底层资源

###### Blob对象的使用

* 图片分片上传
* 监听用户粘贴操作，显示图片
https://blog.csdn.net/joshua2011/article/details/81939889
blob：blob:url

参考：https://www.cnblogs.com/wangfajing/p/7202139.html?utm_source=itdadao&utm_medium=referral

微信文件助手
语言训练：
https://www.codewars.com/dashboard
光源github：
https://github.com/guangyuan-Tang/web-gather

样式私有化
https://blog.csdn.net/sdo2605587/article/details/79141111

async/awite

    export function image(id, cb) {
      // img添加权限指令
      if (id !== 0) {
        axios({
          url: '/attachments/' + id,
          method: 'get',
          responseType: 'arraybuffer'
        }).then((response) => {
          // var mimeType = response.headers['content-type'].toLowerCase();
          // let blob = new Blob([response.data], {
          //   type: mimeType
          // });
          // cb(window.URL.createObjectURL(blob));
          var mimeType = response.headers['content-type'].toLowerCase();
          var imgBase64 = new Buffer(response.data, 'binary').toString('base64');
          cb('data:' + mimeType + ';base64,' + imgBase64);
        }).catch((error) => {
          console.log(error);
        });
      }
    }

    report(val) {
      axios({
        method: 'get',
        url: '/attachments/' + val,
        responseType: 'arraybuffer'
      }).then(function(resp) {
        var mimeType = resp.headers['content-type'].toLowerCase();
        let blob = new Blob([resp.data], {
          type: mimeType
        });
        let aLink = document.createElement('a');
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true);
        aLink.download = new Date().getTime().toString() + '.pdf';
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
      }).catch(function() {});
    }



*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*