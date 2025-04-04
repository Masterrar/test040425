using App.DAL.Models;
using App.Data;
using App.DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
public interface IDataRecordService
{
    Task SaveDataAsync(List<DataRecord> records);
    Task<(List<DataRecord> data, int totalRecords)> GetDataAsync(int? codeFilter, int pageNumber, int pageSize);
}
public class DataRecordService : IDataRecordService
{
    private readonly AppDbContext _context; // Замените на ваш контекст
    private readonly IMapper _mapper;

    public DataRecordService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task SaveDataAsync(List<DataRecord> records)
    {
        records = records.OrderBy(r => r.Code).ToList();

        _context.DataRecords.RemoveRange(_context.DataRecords);
        await _context.SaveChangesAsync();

        await _context.DataRecords.AddRangeAsync(records);
        await _context.SaveChangesAsync();
    }

    public async Task<(List<DataRecord> data, int totalRecords)> GetDataAsync(int? codeFilter, int pageNumber, int pageSize)
    {
        var query = _context.DataRecords.AsQueryable();

        if (codeFilter.HasValue)
            query = query.Where(r => r.Code == codeFilter.Value);

        var totalRecords = await query.CountAsync();

        var data = await query
            .OrderBy(r => r.Id)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (data, totalRecords);
    }
}