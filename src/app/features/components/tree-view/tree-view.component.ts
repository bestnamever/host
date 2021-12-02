import { AttributePickerControlService } from 'src/app/core/services/attributePickerControl.service';
import { OpenremoteService } from './../../../core/services/openremote.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

// Setup of Material Tree component
interface PickerNode {
  id: number;
  name: string;
  children ? : PickerNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})

export class TreeViewComponent implements OnInit {

  @Input() treeType: any;
  usedAssets: any[];

  // Material Design Tree declarations
  treeData: PickerNode[] | any;

  private _transformer = (node: PickerNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl < FlatNode > (
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(private openremoteService: OpenremoteService, private attributePickerControl: AttributePickerControlService) {
    // Get currently used assets
    this.usedAssets = this.openremoteService.getAssets();

    // Subscribe to the assetchange event
    this.attributePickerControl.selectedAssetChange.subscribe(value => {
      if(this.treeType === "ATTRIBUTE" && value !="" && value!= undefined){
        this.getAttributes();
      }
    })
  }

  ngOnInit() {

    // Fill the asset tree with data of the currenlty used assets
    if (this.treeType === "ASSET") {
      this.treeData = <PickerNode[]>this.formatData(this.usedAssets);
      console.log("Tree Assets", this.treeData);
    } else {
      // leave tree empty for now
      this.treeData = [];
    }

    // Set the datasource for the tree
    this.dataSource.data = this.treeData;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  formatData(assets: any[]): object[] {
    // this.usedAssets = this.openremoteService.getAssets();
    let formattedArray = [{
      name: "placeholder",
      children: [{}]
    }];

    assets.forEach((element: any) => {
      let asset = {
        id: element.id ? element.id : this.attributePickerControl.selectedAsset,
        name: element.id ? `${element.name}_${element.id}` : element.name,
        children: []
      }

      if (element.parentName) {

        let index = formattedArray.map(e => e.name).indexOf(`${element.parentName}_${element.parentId}`);
        // Append asset id to the name

        formattedArray[index].children.push(asset);
      } else {
        formattedArray.push(asset);
      }
    });

    formattedArray.splice(0, 1);
    return formattedArray;
  }

  onAssetSelect(event : Event, selectedItem ? : string): void {

    // Get the target element of the click
    let target = <HTMLElement>event.target;

    // Get all the sibling elements
    let siblings = Array.prototype.slice.call(target.parentElement?.children);

    // Make sure all other elements show as not selected
    siblings?.forEach(sibling => {
      sibling.setAttribute("aria-selected", "false");
    })

    // Make the target element show as selected
    target.setAttribute('aria-selected', 'true');
    console.log(siblings);

    // Set the asset or attribute selection in the AtrributePickerControl service based on the tree type
    if (this.treeType === "ASSET" && selectedItem){
      let assetId = this.splitNodeId(selectedItem)

      this.attributePickerControl.setSelectedAsset((assetId) ? assetId : "");
    }
    else if (this.treeType === "ATTRIBUTE" && selectedItem){

      this.attributePickerControl.setSelectedAttribute(selectedItem);
    }
  }

  getAttributes(): any {
    // Get the list of attributes based on the selected asset
    let selectedAsset = this.usedAssets.find(obj => {
      return obj.id == this.attributePickerControl.selectedAsset;
    })

    // Get an array of attributes
    let attributes = Object.values(selectedAsset.attributes);

    // Set the treedata to the array of attributes
    this.treeData = < PickerNode[] > this.formatData(attributes);
    this.dataSource.data = this.treeData;
  }

  /**
   * Function to split the name of a tree-node from the ID
   * @param {string} nodeName The full name of the node including the ID, formatted: "name_id"
   * @returns {string} The name of the node without the ID
   */
  splitNodeName(nodeName: string): string {
    let subString = nodeName.replace(`_${nodeName.split("_").pop()}`, "");

    return (subString) ? subString : nodeName;
  }

  /**
   * Function to split the ID of a tree node from the rest of the name
   * @param {string} nodeName The full name of the node including the ID, formatted: "name_id"
   * @returns {string} The unique ID of the node from the OpenRemote Manager
   */
  splitNodeId(nodeName: string): string {
    let nodeId = nodeName.split("_").pop();

    return (nodeId) ? nodeId : nodeName;
  }


}
