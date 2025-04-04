using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using App.Data;
using App.DAL.Models;
using App.DTO;

namespace App.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DataController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly IDataRecordService dataRecordService;

    public DataController(AppDbContext context, IMapper mapper, IDataRecordService dataRecordService)
    {
        _context = context;
        _mapper = mapper;
        this.dataRecordService = dataRecordService;
    }

    // POST: api/data
    [HttpPost]
    public async Task<IActionResult> PostData([FromBody] List<Dictionary<string, string>> input)
    {
        if (input is null || input.Count == 0)
            return BadRequest("Данные отсутствуют");

        var records = new List<DataRecord>();

        foreach (var dict in input)
        {
            foreach (var pair in dict)
            {
                if (int.TryParse(pair.Key, out var code))
                {
                    records.Add(new DataRecord { Code = code, Value = pair.Value });
                }
            }
        }

        await dataRecordService.SaveDataAsync(records);

        return Ok(new { message = "Данные сохранены" });
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DataRecordDto>>> GetData([FromQuery] int? codeFilter, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
       var result =  await dataRecordService.GetDataAsync(codeFilter, pageNumber, pageSize);


        return Ok(new
        {
            data = _mapper.Map<List<DataRecordDto>>(result.data),
            result.totalRecords
        });
    }
}
