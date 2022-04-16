package  com.ird.faa.ws.rest.provided.facade.chercheur;

import com.ird.faa.service.chercheur.facade.TagChercheurService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import com.ird.faa.bean.Tag;
import com.ird.faa.ws.rest.provided.converter.TagConverter;
import com.ird.faa.ws.rest.provided.vo.TagVo;

@Api("Manages tag services")
@RestController
@RequestMapping("api/chercheur/tag")
public class TagRestChercheur {

@Autowired
private TagChercheurService tagService;

@Autowired
private TagConverter tagConverter;


            @ApiOperation("Updates the specified  tag")
            @PutMapping("/")
            public  TagVo update(@RequestBody  TagVo  tagVo){
            Tag tag = tagConverter.toItem(tagVo);
            tag = tagService.update(tag);
            return tagConverter.toVo(tag);
            }

    @ApiOperation("Finds a list of all tags")
    @GetMapping("/")
    public List<TagVo> findAll(){
        return tagConverter.toVo(tagService.findAll());
    }

    @ApiOperation("Finds a tag with associated lists by id")
    @GetMapping("/detail/id/{id}")
    public TagVo findByIdWithAssociatedList(@PathVariable Long id){
    return tagConverter.toVo(tagService.findByIdWithAssociatedList(id));
    }

    @ApiOperation("Search tag by a specific criteria")
    @PostMapping("/search")
    public List<TagVo> findByCriteria(@RequestBody TagVo tagVo){
        return tagConverter.toVo(tagService.findByCriteria(tagVo));
        }

            @ApiOperation("Finds a tag by id")
            @GetMapping("/id/{id}")
            public TagVo findById(@PathVariable Long id){
            return tagConverter.toVo(tagService.findById(id));
            }

            @ApiOperation("Saves the specified  tag")
            @PostMapping("/")
            public TagVo save(@RequestBody TagVo tagVo){
            Tag tag = tagConverter.toItem(tagVo);
            tag = tagService.save(tag);
            return tagConverter.toVo(tag);
            }

            @ApiOperation("Delete the specified tag")
            @DeleteMapping("/")
            public int delete(@RequestBody TagVo tagVo){
            Tag tag = tagConverter.toItem(tagVo);
            return tagService.delete(tag);
            }

            @ApiOperation("Deletes a tag by id")
            @DeleteMapping("/id/{id}")
            public int deleteById(@PathVariable Long id){
            return tagService.deleteById(id);
            }


            }
