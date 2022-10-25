### Adding CORS handling for Angular

On Startup.cs > Configure

```c#
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{

    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Alumni.web.api"));
    }
    
    // Added to enable CORS on local for Angular
    app.UseCors(builder => builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials());
    
    app.UseHttpsRedirection();
    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapDefaultControllerRoute();
    });

}
```

### Passing Files as List IFormFile from Angular to .NET

.NET Controller
```c#
[HttpPost]
public async Task<IActionResult> UploadMultipleFiles(List<IFormFile>? formFile)
{
    try
    {
        string path = await referBusinessSetup.SaveToLocal(formFile);
        return Ok(new { status = SERVER_CONSTANT.SUCCESS_RESULT, path });
    }
    catch (ArgumentException argsEx)
    {
        return Ok(new { status = SERVER_CONSTANT.FAILED_RESULT, message = argsEx.Message });
    }
    catch (Exception ex)
    {
        return BadRequest(new { status = SERVER_CONSTANT.FAILED_RESULT, message = ex.Message });
    }
}
```

Angular Service
```typescript
uploadFiles(fileList: File[]){
    let formData: FormData = new FormData();
    for(let file of fileList){
      formData.append('formFile', file, file.name);
    }
    let headers = this.getAuthHeader();
    return this.http.post<any>(`${this.baseUrl}/ReferClient/UploadMultipleFiles`, formData, { headers }).pipe(
      catchError(this.handleError)
    );
  }
```

Note: the parameter name required by the controller must be the same as the formData name
```
In C#:
public async Task<IActionResult> UploadMultipleFiles(List<IFormFile>? formFile) // 'formFile' must be the name of the formData

In Angular:
formData.append('formFile', file, file.name); // 'formFile' is the name of the formData appended

```
