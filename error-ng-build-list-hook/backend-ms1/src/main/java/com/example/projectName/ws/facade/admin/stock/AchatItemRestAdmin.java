package  com.example.projectName.ws.facade.admin.stock;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import com.example.projectName.bean.core.stock.AchatItem;
import com.example.projectName.dao.criteria.core.stock.AchatItemCriteria;
import com.example.projectName.service.facade.admin.stock.AchatItemAdminService;
import com.example.projectName.ws.converter.stock.AchatItemConverter;
import com.example.projectName.ws.dto.stock.AchatItemDto;
import com.example.projectName.zynerator.controller.AbstractController;
import com.example.projectName.zynerator.dto.AuditEntityDto;
import com.example.projectName.zynerator.util.PaginatedList;


import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.projectName.zynerator.process.Result;


import org.springframework.web.multipart.MultipartFile;
import com.example.projectName.zynerator.dto.FileTempDto;

@RestController
@RequestMapping("/api/admin/achatItem/")
public class AchatItemRestAdmin  extends AbstractController<AchatItem, AchatItemDto, AchatItemCriteria, AchatItemAdminService, AchatItemConverter> {



    @Operation(summary = "upload one achatItem")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @Operation(summary = "upload multiple achatItems")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @Operation(summary = "Finds a list of all achatItems")
    @GetMapping("")
    public ResponseEntity<List<AchatItemDto>> findAll() throws Exception {
        return super.findAll();
    }


    @Operation(summary = "Finds a achatItem by id")
    @GetMapping("id/{id}")
    public ResponseEntity<AchatItemDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }


    @Operation(summary = "Saves the specified  achatItem")
    @PostMapping("")
    public ResponseEntity<AchatItemDto> save(@RequestBody AchatItemDto dto) throws Exception {
        return super.save(dto);
    }

    @Operation(summary = "Updates the specified  achatItem")
    @PutMapping("")
    public ResponseEntity<AchatItemDto> update(@RequestBody AchatItemDto dto) throws Exception {
        return super.update(dto);
    }

    @Operation(summary = "Delete list of achatItem")
    @PostMapping("multiple")
    public ResponseEntity<List<AchatItemDto>> delete(@RequestBody List<AchatItemDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @Operation(summary = "Delete the specified achatItem")
    @DeleteMapping("")
    public ResponseEntity<AchatItemDto> delete(@RequestBody AchatItemDto dto) throws Exception {
            return super.delete(dto);
    }

    @Operation(summary = "Delete the specified achatItem")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @Operation(summary = "Delete multiple achatItems by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @Operation(summary = "find by produit id")
    @GetMapping("produit/id/{id}")
    public List<AchatItemDto> findByProduitId(@PathVariable Long id){
        return findDtos(service.findByProduitId(id));
    }
    @Operation(summary = "delete by produit id")
    @DeleteMapping("produit/id/{id}")
    public int deleteByProduitId(@PathVariable Long id){
        return service.deleteByProduitId(id);
    }
    @Operation(summary = "find by achat id")
    @GetMapping("achat/id/{id}")
    public List<AchatItemDto> findByAchatId(@PathVariable Long id){
        return findDtos(service.findByAchatId(id));
    }
    @Operation(summary = "delete by achat id")
    @DeleteMapping("achat/id/{id}")
    public int deleteByAchatId(@PathVariable Long id){
        return service.deleteByAchatId(id);
    }

    @Operation(summary = "Finds a achatItem and associated list by id")
    @GetMapping("detail/id/{id}")
    public ResponseEntity<AchatItemDto> findWithAssociatedLists(@PathVariable Long id) {
        return super.findWithAssociatedLists(id);
    }

    @Operation(summary = "Finds achatItems by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<AchatItemDto>> findByCriteria(@RequestBody AchatItemCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @Operation(summary = "Finds paginated achatItems by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody AchatItemCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @Operation(summary = "Exports achatItems by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody AchatItemCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @Operation(summary = "Gets achatItem data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody AchatItemCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }



    public AchatItemRestAdmin (AchatItemAdminService service, AchatItemConverter converter) {
        super(service, converter);
    }




}
